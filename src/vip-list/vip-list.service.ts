import { Injectable } from '@nestjs/common';
import { CreateVipListDto } from './dto/create-vip-list.dto';
import { UpdateVipListDto } from './dto/update-vip-list.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VipList } from './entities/vip-list.entity';
@Injectable()
export class VipListService {
  constructor(@InjectRepository(VipList) private readonly vipRepository: Repository<VipList>) {}
  async create(createVipListDto: CreateVipListDto) {
    const data = await this.vipRepository.save(createVipListDto);
    return data;
  }

  async findAll() {
    const data = await this.vipRepository.find();
    return data;
  }

  // 分页查询
  async findPage(query: any) {
    if (Object.keys(query).length === 0) {
      const data = await this.vipRepository.find({
        order: {
          level: 'ASC',
        },
      });
      return data;
    }
    const { pageSize = 10, current = 1, ...otherParams } = query;
    const [list, total] = await this.vipRepository.findAndCount({
      where: {
        ...otherParams,
      },
      take: pageSize,
      skip: pageSize * (current - 1),
      order: {
        level: 'ASC',
      },
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

  async findOne(id: number) {
    const data = await this.vipRepository.findOneById(id);
    return data;
  }

  // 根据vip等级查询
  async findOneByLevel(level: number): Promise<VipList> {
    const data = await this.vipRepository.findOneBy({
      level,
    });
    return data;
  }

  async update(id: number, updateVipListDto: UpdateVipListDto) {
    // 更新数据
    await this.vipRepository.update(id, updateVipListDto);
    return;
  }

  async remove(id: number) {
    const data = await this.vipRepository.findOneById(id);
    if (data) {
      await this.vipRepository.remove(data);
      return;
    }
    const res = {
      code: 200,
      msg: '数据不存在',
      success: false,
    };
    return res;
  }
}
