import { Injectable } from '@nestjs/common';
import { CreateMidVipDto } from './dto/create-mid-vip.dto';
import { UpdateMidVipDto } from './dto/update-mid-vip.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MidVip } from './entities/mid-vip.entity';
import { VipListService } from '../vip-list/vip-list.service';
@Injectable()
export class MidVipService {
  constructor(
    @InjectRepository(MidVip) private readonly midVipRepository: Repository<MidVip>,
    private readonly vipListService: VipListService,
  ) {}

  async getVipLevel(userId: number) {
    const userVips = await this.midVipRepository.find({
      where: {
        user_id: userId,
      },
    });
    if (!userVips.length) {
      const vipList = await this.vipListService.findAll();
      const vipId = vipList[0].id;
      const newData = {
        user_id: userId,
        vip_id: vipId,
      };
      const newVip = await this.midVipRepository.save(newData);
      return newData;
    }
    return userVips[0];
  }

  findAll() {
    return `This action returns all midVip`;
  }

  findOne(id: number) {
    return `This action returns a #${id} midVip`;
  }

  update(id: number, updateMidVipDto: UpdateMidVipDto) {
    return `This action updates a #${id} midVip`;
  }

  remove(id: number) {
    return `This action removes a #${id} midVip`;
  }
}
