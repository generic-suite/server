import { Injectable } from '@nestjs/common';
import { CreateSysDictTypeDto } from './dto/create-sys-dict-type.dto';
import { UpdateSysDictTypeDto } from './dto/update-sys-dict-type.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { SysDictType } from './entities/sys-dict-type.entity';

@Injectable()
export class SysDictTypeService {
  constructor(@InjectRepository(SysDictType) private readonly SysDictTypeRepository: Repository<SysDictType>) {}

  async create(createSysDictTypeDto: CreateSysDictTypeDto) {
    const newData = createSysDictTypeDto;
    // 倒序插入
    await this.SysDictTypeRepository.insert(newData);
    return {
      code: 200,
      msg: '创建成功',
      success: true,
    };
  }

  async findAll(params) {
    const { pageSize = 10, current = 1, ...otherParams } = params;
    const where = {};
    Object.keys(otherParams).forEach((key) => {
      where[key] = Like(`%${otherParams[key]}%`);
    });
    const [list, total] = await this.SysDictTypeRepository.findAndCount({
      where,
      order: {
        id: 'DESC',
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
      msg: '查询成功',
    };
  }

  async findOne(id: number) {
    const data = await this.SysDictTypeRepository.findOneById(id);
    return {
      code: 200,
      data,
      success: true,
      msg: '查询成功',
    };
  }

  async update(id: number, updateSysDictTypeDto: UpdateSysDictTypeDto) {
    const parmas = updateSysDictTypeDto;
    // 更新数据
    await this.SysDictTypeRepository.update(id, parmas);
    return {
      code: 200,
      msg: '更新成功',
      success: true,
    };
  }

  async remove(id: number) {
    await this.SysDictTypeRepository.delete(id);
    return {
      code: 200,
      msg: '删除成功',
      success: true,
    };
  }
}
