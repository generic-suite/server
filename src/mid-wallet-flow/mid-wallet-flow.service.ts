import { Injectable } from '@nestjs/common';
import { CreateMidWalletFlowDto } from './dto/create-mid-wallet-flow.dto';
import { UpdateMidWalletFlowDto } from './dto/update-mid-wallet-flow.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MidWalletFlow } from './entities/mid-wallet-flow.entity';

@Injectable()
export class MidWalletFlowService {
  constructor(
    @InjectRepository(MidWalletFlow)
    private readonly midWalletFlowRepository: Repository<MidWalletFlow>,
  ) {}
  async create(createMidWalletFlowDto: CreateMidWalletFlowDto) {
    const data = {
      ...createMidWalletFlowDto,
    };
    const res = await this.midWalletFlowRepository.save(data);
  }

  // 分页查询
  async findPage(query: any) {
    const { pageSize = 10, current = 1, ...otherParams } = query;
    const [list, total] = await this.midWalletFlowRepository.findAndCount({
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

  async findUserPage(query: any, userId: number) {
    console.log(userId, query);
    const { pageSize = 10, current = 1, ...otherParams } = query;
    const [list, total] = await this.midWalletFlowRepository.findAndCount({
      where: {
        ...otherParams,
        userId: userId,
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

  findOne(id: number) {
    return `This action returns a #${id} midWalletFlow`;
  }

  update(id: number, updateMidWalletFlowDto: UpdateMidWalletFlowDto) {
    return `This action updates a #${id} midWalletFlow`;
  }

  remove(id: number) {
    return `This action removes a #${id} midWalletFlow`;
  }
}
