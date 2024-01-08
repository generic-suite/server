import { Injectable } from '@nestjs/common';
import { CreateSystemConfigDto } from './dto/create-system-config.dto';
import { UpdateSystemConfigDto } from './dto/update-system-config.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { SystemConfig } from './entities/system-config.entity';

@Injectable()
export class SystemConfigService {
  constructor(@InjectRepository(SystemConfig) private readonly systemConfigRepository: Repository<SystemConfig>) {}
  async create(createSystemConfigDto: CreateSystemConfigDto) {
    const newData = createSystemConfigDto;

    // 倒序插入
    await this.systemConfigRepository.insert(newData);
    return {
      code: 200,
      msg: '创建成功',
      success: true,
    };
  }

  async findConfig() {
    // 查到数据库中的数据
    const list = await this.systemConfigRepository.findOneById(1);
    return {
      code: 200,
      data: list,
      success: true,
      msg: '查询成功',
    };
  }

  findAll() {
    return `This action returns all systemConfig`;
  }

  findOne(id: number) {
    return `This action returns a #${id} systemConfig`;
  }

  async update(updateSystemConfigDto: UpdateSystemConfigDto) {
    const parmas = updateSystemConfigDto;
    // 更新数据
    await this.systemConfigRepository.update(1, parmas);
    return {
      code: 200,
      msg: '更新成功',
      success: true,
    };
  }
}
