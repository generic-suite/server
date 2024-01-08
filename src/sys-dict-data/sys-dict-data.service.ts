import { Injectable } from '@nestjs/common';
import { CreateSysDictDatumDto } from './dto/create-sys-dict-datum.dto';
import { UpdateSysDictDatumDto } from './dto/update-sys-dict-datum.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { SysDictData } from './entities/sys-dict-datum.entity';
import { SysDictType } from '../sys-dict-type/entities/sys-dict-type.entity';

@Injectable()
export class SysDictDataService {
  constructor(
    @InjectRepository(SysDictData) private readonly SysDictDataRepository: Repository<SysDictData>,
    @InjectRepository(SysDictType) private readonly SysDictTypeRepository: Repository<SysDictType>,
  ) {}
  async create(createSysDictDatumDto: CreateSysDictDatumDto) {
    const data = createSysDictDatumDto;
    const dictType = createSysDictDatumDto.dict_type;
    // 根据dict_type查询字典数据
    const findData = await this.SysDictTypeRepository.findOne({
      where: {
        dict_type: dictType,
      },
    });
    if (!findData) {
      return {
        code: 400,
        msg: '字典类型不存在',
        success: false,
      };
    }

    // 根据dict_type和dict_value查询字典数据
    const findData2 = await this.SysDictDataRepository.findOne({
      where: {
        dict_type: dictType,
        dict_value: data.dict_value,
      },
    });
    if (findData2) {
      return {
        code: 400,
        msg: '字典数据已存在',
        success: false,
      };
    }

    await this.SysDictDataRepository.insert(data);

    return {
      code: 200,
      msg: '创建成功',
      success: true,
    };
  }

  async findOfType(dictType: string, params: any) {
    const { pageSize = 10, current = 1, ...otherParams } = params;
    const where = {
      dict_type: dictType,
    };
    Object.keys(otherParams).forEach((key) => {
      where[key] = Like(`%${otherParams[key]}%`);
    });
    const [list, total] = await this.SysDictDataRepository.findAndCount({
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

  findOne(id: number) {
    return `This action returns a #${id} sysDictDatum`;
  }

  async update(id: number, updateSysDictDatumDto: UpdateSysDictDatumDto) {
    const parmas = updateSysDictDatumDto;
    console.log('🚀  file: sys-dict-data.service.ts:94  SysDictDataService  update  parmas:', parmas)
    // 更新数据
    await this.SysDictDataRepository.update(id, parmas);
    return {
      code: 200,
      msg: '更新成功',
      success: true,
    };
  }

  async remove(id: number) {
    // 先查找是否有该数据
    const findData = await this.SysDictDataRepository.findOne({
      where: {
        id,
      },
    });
    if (!findData) {
      return {
        code: 400,
        msg: '字典数据不存在',
        success: false,
      };
    }
    await this.SysDictDataRepository.delete(id);
    return {
      code: 200,
      msg: '删除成功',
      success: true,
    };
  }
}
