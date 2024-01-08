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

  async findOne(id: number) {
    const data = await this.vipRepository.findOneById(id);
    return data;
  }

  async update(id: number, updateVipListDto: UpdateVipListDto) {
    const data = await this.vipRepository.findOneById(id);
    if (data) {
      const newData = await this.vipRepository.save({ ...data, ...updateVipListDto });
      return newData;
    }

    const res = {
      code: 200,
      msg: '数据不存在',
      success: false,
    };
    return res;
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
