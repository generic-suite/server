import { Injectable } from '@nestjs/common';
import { SaveMidBankDto } from './dto/save-mid-bank.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { MidBank } from './entities/mid-bank.entity';
@Injectable()
export class MidBankService {
  constructor(@InjectRepository(MidBank) private readonly systemConfigRepository: Repository<MidBank>) {}
  async save(saveMidBankDto: SaveMidBankDto, userId: number) {
    // 根据userId查数据
    const list = await this.systemConfigRepository.find({
      where: {
        user_id: userId,
      },
    });
    // 如果有数据就更新，没有就插入
    if (list.length > 0) {
      // 更新数据
      const parmas = {
        ...saveMidBankDto,
      };
      await this.systemConfigRepository.update(list[0].id, parmas);
      return;
    }
    // 倒序插入
    const newData = {
      ...saveMidBankDto,
      user_id: userId,
    };
    await this.systemConfigRepository.insert(newData);
    return;
  }

  async findData(userId: number) {
    // 查到数据库中的数据
    const list = await this.systemConfigRepository.find({
      where: {
        user_id: userId,
      },
    });
    // 初始化数据格式
    const data = {
      bank_name: '', // 银行名称
      bank_card: '', // 银行卡号
      bank_account: '', // 银行账户
      branch_name: '', // 支行名称
      branch_number: '', // 支行联行号
    };
    // 如果没有数据，直接返还初始化数据
    return list.length ? list[0] : data;
  }
}
