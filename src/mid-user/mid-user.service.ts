import { Injectable } from '@nestjs/common';
import { CreateMidUserDto } from './dto/create-mid-user.dto';
import { UpdateMidUserDto } from './dto/update-mid-user.dto';
import { SubmitOrderDto } from './dto/submit-order.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { MidUser } from './entities/mid-user.entity';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

import { VipListService } from 'src/vip-list/vip-list.service';
import { MidWalletFlowService } from '../mid-wallet-flow/mid-wallet-flow.service';
@Injectable()
export class MidUserService {
  constructor(
    @InjectRepository(MidUser) private readonly midUserRepository: Repository<MidUser>,
    private readonly eventEmitter: EventEmitter2,
    private readonly vipListService: VipListService,
    private readonly midWalletFlowService: MidWalletFlowService,
  ) {}

  // 生成邀请码
  generateInviteCode() {
    const code = Math.random().toString(36).substr(2, 6).toUpperCase();
    return code;
  }

  // 初始化
  @OnEvent('new_user_register', { async: true })
  async init(user: MidUser) {
    // 获取会员列表
    const vipList = await this.vipListService.findAll();
    // 获取会员列表中，等级最低的会员
    const vipItem = vipList.sort((a, b) => a.level - b.level)[0];

    // 根据邀请码查询上级用户 如果没有上级用户则为0
    const inviteCodeUser = await this.midUserRepository.findOneBy({
      invite_code: user.invite_code,
    });
    const parent_id = inviteCodeUser ? inviteCodeUser.id : 0;

    const invite_code = this.generateInviteCode();
    // 初始化中间表
    const midUser = {
      ...user,
      level_id: vipItem.id,
      parent_id: parent_id,
      invite_code: invite_code,
      order_count: vipItem.order_count,
    };
    const data = await this.midUserRepository.save(midUser);
  }

  // 更新指定字段
  async updateField(userId: number, field: string, value: any) {
    const midUser = await this.midUserRepository.findOneBy({
      userId: userId,
    });
    midUser[field] = value;
    const data = await this.midUserRepository.save(midUser);
    return data;
  }

  // 每日0点，清空当日订单数和当日订单金额
  @OnEvent('clear_order_count', { async: true })
  async clearOrderCount() {
    // 给数据库中的每个用户的当日订单数和当日订单金额清零
    const data = await this.midUserRepository.update({}, { today_trade_order_count: 0, today_trade_money: '0' });
  }

  // 加扣款
  async changeBalance(user_id: number, amount: number, isRecharge: boolean) {
    const midUser = await this.midUserRepository.findOneBy({
      userId: user_id,
    });
    // 记录一下充值前的金额
    const beforePrice = midUser.balance;
    if (isRecharge) {
      midUser.balance = +midUser.balance + amount + '';
      midUser.recharge_money = +midUser.recharge_money + amount + ''; // 累计充值
    } else {
      midUser.balance = +midUser.balance - amount + '';
      midUser.withdraw_money = +midUser.withdraw_money + amount + ''; // 累计提现
    }
    // 先在钱包流水表中添加一条记录
    const walletFlowData = {
      username: midUser.username,
      userId: user_id,
      type: 1,
      status: isRecharge ? 1 : 2,
      price: amount + '',
      beforePrice: beforePrice + '',
      remark: isRecharge ? '充值' : '提现',
    };
    await this.midWalletFlowService.create(walletFlowData);
    // 再在钱包表中更新余额
    await this.midUserRepository.save(midUser);
    return;
  }

  // 重置任务
  async resetTask(user_id: number) {
    const midUser = await this.midUserRepository.findOneBy({
      userId: user_id,
    });
    midUser.today_trade_order_count = 0;
    midUser.today_trade_money = '0';
    await this.midUserRepository.save(midUser);
    return;
  }

  // 获取用户信息
  async getUserInfo(user_id: number): Promise<MidUser> {
    const midUser = await this.midUserRepository.findOneBy({
      userId: user_id,
    });
    // 用户的vip信息
    const vipData = await this.vipListService.findOneByLevel(midUser.level_id);
    const userData = {
      ...midUser,
      vip: vipData,
    };
    return userData;
  }

  // 更新用户信息 --- 用于submitOrder 时, 更新用户的订单数量和交易金额
  async update(userId: number, updateMidUserDto: SubmitOrderDto) {
    const midUser = await this.midUserRepository.findOneBy({
      userId: userId,
    });
    midUser.trade_order_count = updateMidUserDto.trade_order_count;
    midUser.today_trade_order_count = updateMidUserDto.today_trade_order_count;
    midUser.trade_money = updateMidUserDto.trade_money + '';
    midUser.today_trade_money = updateMidUserDto.today_trade_money + '';
    const data = await this.midUserRepository.save(midUser);
    return data;
  }

  // 查询所有用户
  async findAll(query) {
    const { pageSize = 10, current = 1, ...otherParams } = query;

    const where = {};
    if (otherParams.username) {
      where['username'] = Like(`%${otherParams.username}%`);
    }

    const [list, total] = await this.midUserRepository.findAndCount({
      where,
      skip: pageSize * (current - 1),
      take: pageSize,
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

  // 获取用户的vip等级信息
  async getVipInfo(level_id: number) {
    const vipInfo = await this.vipListService.findOneByLevel(level_id);
    return vipInfo;
  }

  // 设置用户的vip等级
  async setVip(user_id: number, level_id: number) {
    const midUser = await this.midUserRepository.findOneBy({
      userId: user_id,
    });
    const vipInfo = await this.getVipInfo(level_id);
    // 设置用户的vip等级
    midUser.level_id = level_id;
    // 设置用户的每日可做任务量
    midUser.order_count = vipInfo.order_count;
    await this.midUserRepository.save(midUser);
    return;
  }

  // 设置用户的体验金
  async experienceGold(user_id: number, amount: number) {
    const midUser = await this.getUserInfo(user_id);
    midUser.experience_money = amount + '';
    await this.midUserRepository.save(midUser);
    return;
  }
}
