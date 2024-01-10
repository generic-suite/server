import { Injectable } from '@nestjs/common';
import { CreateMidOrderDto } from './dto/create-mid-order.dto';
import { UpdateMidOrderDto } from './dto/update-mid-order.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MidOrder } from './entities/mid-order.entity';

import { MidUser } from 'src/mid-user/entities/mid-user.entity';

// 引入会员服务
import { MidVipService } from '../mid-vip/mid-vip.service';
import { VipListService } from '../vip-list/vip-list.service';
import { GoodsService } from '../goods/goods.service';
import { MidUserService } from 'src/mid-user/mid-user.service';
@Injectable()
export class MidOrderService {
  constructor(
    @InjectRepository(MidOrder) private readonly midOrderRepository: Repository<MidOrder>,
    private readonly midVipService: MidVipService,
    private readonly vipListService: VipListService,
    private readonly goodsService: GoodsService,
    private readonly midUserService: MidUserService,
  ) {}

  async startOrder(userId: number) {
    // 获取当前用户的vip等级
    const vipLevel = await this.midVipService.getVipLevel(userId);
    const vipData = await this.vipListService.findOne(vipLevel.vip_id);

    // 校验该用户是否有未完成的订单
    const unDoneOrder = await this.midOrderRepository.findOne({
      where: {
        user_id: userId,
        order_status: 1,
      },
    });
    if (unDoneOrder) {
      return {
        code: 200,
        msg: '您有未完成的订单，请完成后再来',
        success: false,
      };
    }
    // 校验当前用户已完成的订单数量
    const doneOrderCount = await this.midOrderRepository.count({
      where: {
        user_id: userId,
        order_status: 2,
        order_time: new Date(),
      },
    });
    // 获取当前用户的vip等级对应的任务数量
    const vipTaskCount = vipData.order_count;
    if (doneOrderCount >= vipTaskCount) {
      return {
        code: 200,
        msg: `任务已完成 ${doneOrderCount}/${vipTaskCount}`,
        success: false,
      };
    }

    // 创建订单
    // 1. 获取当前登录用户的余额
    const midUser = await this.midUserService.getUserInfo(userId);
    const userBalance = +midUser.balance;

    // 2. 获取当前用户的vip等级的价格范围 [price_min, price_max] %
    const vipPrice_min = vipData.price_min;
    const vipPrice_max = vipData.price_max;
    // 3. 计算出用户可以购买的价格区间
    const userPrice_min = userBalance * (vipPrice_min / 100);
    const userPrice_max = userBalance * (vipPrice_max / 100);
    // 4. 拿到所有的商品列表
    const goodsList = await this.goodsService.findAllGoods();
    // 5. 过滤出用户可以购买的商品列表
    const canBuyGoodsList = goodsList.filter((item) => {
      return +item.price >= userPrice_min && +item.price <= userPrice_max;
    });
    // 5.1 如果没有可以购买的商品
    if (canBuyGoodsList.length === 0) {
      return {
        code: 200,
        msg: '当前余额不足以购买任何商品',
        success: false,
      };
    }
    // 6. 随机获取一件商品
    const randomIndex = Math.floor(Math.random() * canBuyGoodsList.length);
    const randomGood = canBuyGoodsList[randomIndex];
    // 7. 创建订单
    const orderNo = 'SC' + Math.floor(Math.random() * 100000000); // 订单编号为 SC + 8位随机数
    const newOrder = {
      user_id: userId,
      goods_id: randomGood.id,
      goods_num: 1,
      order_amount: +randomGood.price * 1,
      order_commission: (vipData.return_rate / 100) * +randomGood.price * 1,
      order_status: 1,
      commission_status: 1,
      order_no: orderNo,
    };
    const order = await this.midOrderRepository.save(newOrder);
    return newOrder;
  }

  async submitOrder(orderId: number, userId: number) {
    // 1. 校验订单是否存在
    const data = await this.midOrderRepository.findOneById(orderId);
    if (!data) {
      return {
        code: 200,
        msg: '订单不存在',
        success: false,
      };
    }
    // 2. 校验订单状态是否已经完成过
    if (data.order_status == 2) {
      return {
        code: 200,
        msg: '订单已完成',
        success: false,
      };
    }

    // 3. 校验订单是否是当前用户的
    if (data.user_id != userId) {
      return {
        code: 200,
        msg: '订单不属于当前用户',
        success: false,
      };
    }

    const newData = {
      ...data,
      order_status: 2, // 2-交易完成
      commission_status: 2, // 2-已返佣
      order_time: new Date(), // 订单完成时间
    };

    // 4. 用户信息更新(更新用户今日完成订单数量/总订单数量/交易总金额/今日交易金额)
    const midUser = await this.midUserService.getUserInfo(userId);
    midUser.trade_order_count++; // 总订单数量+1
    midUser.today_trade_order_count++; // 今日订单数量+1
    midUser.trade_money = +midUser.trade_money + +newData.order_amount; // 交易总金额+订单金额
    midUser.today_trade_money = +midUser.today_trade_money + +newData.order_amount; // 今日交易金额+订单金额

    try {
      await this.midOrderRepository.manager.transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.save(MidUser, midUser); // 更新用户信息
        await transactionalEntityManager.save(MidOrder, newData); // 更新订单信息
        return;
      });
    } catch (error) {
      return {
        code: 200,
        msg: '提交订单失败',
        success: false,
      };
    }

    return;
  }
}
