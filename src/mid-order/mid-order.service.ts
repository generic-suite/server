import { Injectable } from '@nestjs/common';
import { CreateMidOrderDto } from './dto/create-mid-order.dto';
import { UpdateMidOrderDto } from './dto/update-mid-order.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MidOrder } from './entities/mid-order.entity';
import { MidUser } from 'src/mid-user/entities/mid-user.entity';
import { MidWalletFlow } from 'src/mid-wallet-flow/entities/mid-wallet-flow.entity';

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

  async getOrderList(userId) {
    const list = await this.midOrderRepository.find({
      // 按照时间倒序
      order: {
        create_time: 'DESC',
      },
      where: {
        user_id: userId,
      },
    });
    return {
      code: 200,
      data: list,
      success: true,
      msg: '操作成功',
    };
  }
  async startOrder(user: { userId: number; username: string }) {
    const userId = user.userId;
    const username = user.username;
    // 获取用户信息
    const midUser = await this.midUserService.getUserInfo(userId);

    // 校验用户的交易状态
    if (midUser.is_allow_trade == 2) {
      return {
        code: 200,
        msg: '您已被禁止交易',
        success: false,
      };
    }

    // 获取当前用户的vip等级
    const vipData = await this.vipListService.findOne(midUser.level_id);

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

    // 校验该用户的余额是否满足vip等级限定的接单金额 // 余额 + 体验金 < vip等级限定的接单金额
    if (+midUser.balance + +midUser.experience_money < +vipData.order_amount_min) {
      return {
        code: 200,
        msg: '当前余额不足以接单',
        success: false,
      };
    }

    // 校验该用户是否超出每日接单数量
    const doneOrderCount = await this.midOrderRepository.count({
      where: {
        user_id: userId,
        order_status: 2,
        order_time: new Date(),
      },
    });
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
    const userBalance = +midUser.balance + +midUser.experience_money;
    // 2. 获取当前用户的vip等级的价格范围 [price_min, price_max] %
    const vipPrice_min = vipData.price_min;
    const vipPrice_max = vipData.price_max;
    // 3. 计算出用户可以购买的价格区间
    const userPrice_min = userBalance * (+vipPrice_min / 100);
    const userPrice_max = userBalance * (+vipPrice_max / 100);
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
    // 7. 预设订单数据
    const orderNo = 'SC' + Math.floor(Math.random() * 100000000); // 订单编号为 SC + 8位随机数
    const newOrder = {
      user_id: userId,
      username: username,
      goods_id: randomGood.id,
      goods_name: randomGood.good_name,
      goods_num: 1,
      goods_img: randomGood.good_img,
      order_amount: +randomGood.price * 1 + '',
      order_commission: (vipData.return_rate / 100) * +randomGood.price * 1 + '',
      order_status: 1,
      commission_status: 1,
      order_no: orderNo,
    };

    // 8 和 9 需要事务处理
    try {
      await this.midOrderRepository.manager.transaction(async (transactionalEntityManager) => {
        // 8. 从用户余额中扣除订单金额

        // 优先扣除体验金
        let experience_money = +midUser.experience_money; // 体验金
        let freeze_experience_money = +midUser.freeze_experience_money; // 冻结体验金
        let balance = +midUser.balance; // 余额
        let freeze_money = +midUser.freeze_money; // 冻结金额
        // 如果有体验金
        if (experience_money > 0) {
          if (experience_money >= +newOrder.order_amount) {
            // 且体验金大于当前订单的金额,则全部从体验金中扣除
            experience_money = experience_money - +newOrder.order_amount;
            freeze_experience_money = freeze_experience_money + +newOrder.order_amount;
          } else {
            // 体验金小于当前订单的金额,则从体验金中扣除,剩余的从余额中扣除
            freeze_experience_money = freeze_experience_money + +experience_money;
            experience_money = 0;
            balance = balance - (+newOrder.order_amount - +experience_money); // 余额 = 余额 - (订单金额 - 体验金)
            freeze_money = freeze_money + (+newOrder.order_amount - +experience_money); // 冻结金额 = 冻结金额 + (订单金额 - 体验金)
          }
        } else {
          // 如果没有体验金,则从余额中扣除
          balance = balance - +newOrder.order_amount;
          freeze_money = freeze_money + +newOrder.order_amount;
        }

        await transactionalEntityManager.update(MidUser, midUser.id, {
          balance: balance + '', // 更新用户余额
          freeze_money: balance + '', // 冻结金额
          experience_money: experience_money + '', // 体验金
          freeze_experience_money: freeze_experience_money + '', // 冻结体验金
        });
        // 9. 创建订单
        const orderData = await transactionalEntityManager.save(MidOrder, newOrder);
        // 定义流水数据
        const newFlow = {
          userId: userId,
          username: username,
          orderId: orderData.order_id,
          type: 3, // 交易
          status: 2, // 支出
          price: +newOrder.order_amount + '', // 交易金额
          beforePrice: +midUser.balance + '', // 交易前金额
        };
      });
      return newOrder;
    } catch (error) {
      return {
        code: 200,
        msg: '提交订单失败',
        success: false,
      };
    }
  }

  async submitOrder(orderId: number, userId: number) {
    // 校验用户的交易状态
    const midUser = await this.midUserService.getUserInfo(userId);
    if (midUser.is_allow_trade == 2) {
      return {
        code: 200,
        msg: '您已被禁止交易',
        success: false,
      };
    }

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

    // 定义流水数据
    const newFlow = {
      userId: userId,
      username: midUser.username,
      orderId: orderId,
      type: 3, // 交易
      status: 1, // 收入
      price: +newData.order_amount + '', // 交易金额
      beforePrice: +midUser.balance + '', // 交易前金额
    };
    // 4. 用户信息更新(更新用户今日完成订单数量/总订单数量/交易总金额/今日交易金额)
    const userData = {
      ...midUser,
      trade_order_count: midUser.trade_order_count++, // 总订单数量+1
      today_trade_order_count: midUser.today_trade_order_count++, // 今日订单数量+1
      trade_money: +midUser.trade_money + +newData.order_amount + '', // 交易总金额+
      today_trade_money: +midUser.today_trade_money + +newData.order_amount + '', // 今日交易金额+
    };

    // 如果此时用户有冻结的体验金，则优先返还体验金
    if (+midUser.freeze_experience_money > 0) {
      if (+midUser.freeze_experience_money >= +newData.order_amount) {
        // 如果冻结的体验金大于当前订单的金额,则全部从冻结的体验金中扣除
        userData.freeze_experience_money = +midUser.freeze_experience_money - +newData.order_amount + ''; // 冻结的体验金 = 冻结的体验金 - 订单金额
        userData.experience_money = +midUser.experience_money + +newData.order_amount + ''; // 体验金 = 体验金 + 订单金额
      } else {
        // 如果冻结的体验金小于当前订单的金额,则从冻结的体验金中扣除,剩余的从冻结的余额中扣除
        userData.freeze_experience_money = 0 + ''; // 冻结的体验金 = 0
        userData.experience_money = +midUser.experience_money + +midUser.freeze_experience_money + ''; // 体验金 = 体验金 + 冻结的体验金
        userData.freeze_money = +midUser.freeze_money - (+newData.order_amount - +midUser.freeze_experience_money) + ''; // 冻结的余额 = 冻结的余额 - (订单金额 - 冻结的体验金)
        userData.balance = +midUser.balance + (+newData.order_amount - +midUser.freeze_experience_money) + ''; // 余额 = 余额 + (订单金额 - 冻结的体验金)
      }
    } else {
      // 如果没有冻结的体验金,则从冻结的余额中扣除
      userData.freeze_money = +midUser.freeze_money - +newData.order_amount + ''; // 冻结的余额 = 冻结的余额 - 订单金额
      userData.balance = +midUser.balance + +newData.order_amount + ''; // 余额 = 余额 + 订单金额
    }

    // 1. 返还冻结金额, 余额 = 余额 + 冻结金额.先在钱包流水表中添加一条记录
    // 2. 在用户钱包中更新余额
    // 3. 更新订单状态
    // 4. 佣金结算,现在钱包流水中添加一条记录
    // 5. 在用户钱包中更新余额 (余额 = 余额 + 佣金)
    try {
      await this.midOrderRepository.manager.transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.save(MidWalletFlow, newFlow); // 更新流水信息
        await transactionalEntityManager.save(MidUser, userData); // 更新用户信息
        await transactionalEntityManager.save(MidOrder, newData); // 更新订单信息
        // 定义返佣流水数据
        const newCommissionFlow = {
          userId: userId,
          username: midUser.username,
          orderId: orderId,
          type: 4, // 返佣
          status: 1, // 收入
          price: +newData.order_commission + '', // 交易金额
          beforePrice: +userData.balance + '', // 交易前金额
        };
        await transactionalEntityManager.save(MidWalletFlow, newCommissionFlow); // 更新流水信息
        // 定于用户余额数据
        const userData_commission = {
          ...midUser,
          balance: +userData.balance + +newData.order_commission + '', // 余额 = 余额 + 返佣金额
          trade_money: +userData.trade_money + +newData.order_commission + '', // 交易总金额 = 交易总金额 + 返佣金额
          today_trade_money: +userData.today_trade_money + +newData.order_commission + '', // 今日交易金额 = 今日交易金额 + 返佣金额
          commission_total: +midUser.commission_total + +newData.order_commission + '', // 返佣总金额 = 返佣总金额 + 返佣金额
          commission_today: +midUser.commission_today + +newData.order_commission + '', // 今日返佣金额 = 今日返佣金额 + 返佣金额
        };
        await transactionalEntityManager.save(MidUser, userData_commission); // 更新用户信息
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

  async findPage(query: any) {
    const { pageSize = 10, current = 1, ...otherParams } = query;
    const [list, total] = await this.midOrderRepository.findAndCount({
      where: {
        ...otherParams,
      },
      take: pageSize,
      skip: pageSize * (current - 1),
    });
    return {
      code: 200,
      data: {
        list,
        pagination: {
          total,
          pageSize,
          current,
        },
      },
      success: true,
      msg: '操作成功',
    };
  }
}
