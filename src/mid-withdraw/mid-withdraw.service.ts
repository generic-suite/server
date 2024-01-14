import { Injectable } from '@nestjs/common';
import { CreateMidWithdrawDto } from './dto/create-mid-withdraw.dto';
import { UpdateMidWithdrawDto } from './dto/update-mid-withdraw.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { MidWithdraw } from './entities/mid-withdraw.entity';
import { MidUserService } from 'src/mid-user/mid-user.service';
import { MidBankService } from 'src/mid-bank/mid-bank.service';
import * as Moment from 'moment'; // 处理时间的工具
@Injectable()
export class MidWithdrawService {
  constructor(
    @InjectRepository(MidWithdraw) private readonly midWithdrawRepository: Repository<MidWithdraw>,
    private readonly midUserService: MidUserService,
    private readonly midBankService: MidBankService,
  ) {}
  async create(createMidWithdrawDto: CreateMidWithdrawDto, userInfo: { userId: number; username: string }) {
    const { deal_pass } = createMidWithdrawDto;
    const user = await this.midUserService.getUserInfo(userInfo.userId);
    // 是否满足提现条件-用户交易状态
    if (user.is_allow_trade !== 1) {
      return {
        code: 400,
        success: false,
        msg: '该用户不允许交易',
      };
    }
    // 是否满足提现条件-提现密码
    if (user.deal_pass !== deal_pass) {
      return {
        code: 400,
        success: false,
        msg: '提现密码错误',
      };
    }

    const { balance } = user;
    const { amount } = createMidWithdrawDto;
    // 是否满足提现条件-余额
    if (+balance < amount) {
      return {
        code: 400,
        success: false,
        msg: '余额不足',
      };
    }
    const { level_id } = user;
    const vipInfo = await this.midUserService.getVipInfo(level_id);
    // 是否已满足提现条件-提现最小金额
    if (vipInfo.withdraw_min !== 0 && amount < vipInfo.withdraw_min) {
      return {
        code: 400,
        success: false,
        msg: '提现金额不能小于最小提现金额',
      };
    }
    // 是否已满足提现条件-提现最大金额
    if (vipInfo.withdraw_max != 0 && amount > vipInfo.withdraw_max) {
      return {
        code: 400,
        success: false,
        msg: '提现金额不能大于最大提现金额',
      };
    }
    // 是否已满足提现条件-今日订单数量
    if (user.today_trade_order_count < vipInfo.withdraw_order_count) {
      return {
        code: 400,
        success: false,
        msg: '今日订单数量未达到提现条件',
      };
    }

    // 根据用户id查询用户钱包信息
    const walletInfo = await this.midBankService.findData(userInfo.userId);
    const newData = {
      user_id: userInfo.userId,
      username: userInfo.username,
      amount: createMidWithdrawDto.amount + '', // 提现金额
      fee: +vipInfo.withdraw_fee * +createMidWithdrawDto.amount + '', // 手续费
      status: 0, // 提现状态 0:待审核 1:审核通过 2:审核不通过
      price_pre: +balance + '', // 提现前金额
      bank_name: walletInfo.bank_name, // 银行名称
      bank_card: walletInfo.bank_card, // 银行卡号
      bank_account: walletInfo.bank_account, // 开户人
      branch_name: walletInfo.branch_name, // 支行名称
      branch_number: walletInfo.branch_number, // 支行联行号
    };
    // 创建一条新的提现记录
    const data = await this.midWithdrawRepository.save(newData);
    return;
  }

  // 查询用户所有提现记录
  async findUserAll(query: any, user: { username: string; userId: number }) {
    const { pageSize = 10, current = 1, ...otherParams } = query;
    const where = {
      user_id: user.userId,
      ...otherParams,
    };
    const [list, total] = await this.midWithdrawRepository.findAndCount({
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
      msg: '查询成功',
    };
  }

  async findAll(query: any) {
    const { pageSize = 10, current = 1, ...otherParams } = query;
    const [list, total] = await this.midWithdrawRepository.findAndCount({
      where: {
        ...otherParams,
      },
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
      msg: '查询成功',
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} midWithdraw`;
  }
  async update(id: number, updateMidWithdrawDto: UpdateMidWithdrawDto, user) {
    const { status, audit_info } = updateMidWithdrawDto;
    const newData = {
      status,
      audit_info,
      audit_user: user.username,
      audit_time: Moment().format('YYYY-MM-DD HH:mm:ss'),
    };
    await this.midWithdrawRepository.update(id, newData);
    return;
  }

  remove(id: number) {
    return `This action removes a #${id} midWithdraw`;
  }
}
