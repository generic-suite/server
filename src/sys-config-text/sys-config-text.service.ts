import { Injectable } from '@nestjs/common';
import { CreateSysConfigTextDto } from './dto/create-sys-config-text.dto';
import { UpdateSysConfigTextDto } from './dto/update-sys-config-text.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SysConfigText } from './entities/sys-config-text.entity';

@Injectable()
export class SysConfigTextService {
  constructor(
    @InjectRepository(SysConfigText)
    private readonly sysConfigTextRepository: Repository<SysConfigText>,
  ) {}
  async create(createSysConfigTextDto: CreateSysConfigTextDto) {
    // 在数据库中查询是否存在同一个配置项和语言的数据
    const where = {
      config_type: createSysConfigTextDto.config_type,
      lang: createSysConfigTextDto.lang,
    };
    const sysConfigText = await this.sysConfigTextRepository.findOne({
      where,
    });
    if (sysConfigText) {
      // 如果存在，则更新
      await this.sysConfigTextRepository.update(sysConfigText.id, {
        content: createSysConfigTextDto.content,
      });
      return {
        code: 200,
        msg: '操作成功',
        success: true,
      };
    } else {
      // 如果不存在,则新增
      const params = {
        config_type: createSysConfigTextDto.config_type,
        lang: createSysConfigTextDto.lang,
        content: createSysConfigTextDto.content,
      };
      await this.sysConfigTextRepository.save(params);
      return {
        code: 200,
        msg: '操作成功',
        success: true,
      };
    }
  }

  async findAll(query: any) {
    const { pageSize = 10, current = 1, ...otherParams } = query;
    const where = {
      ...otherParams,
    };
    const [list, total] = await this.sysConfigTextRepository.findAndCount({
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

  async remove(id: number) {
    await this.sysConfigTextRepository.delete(id);
    return {
      code: 200,
      msg: '操作成功',
      success: true,
    };
  }
}
