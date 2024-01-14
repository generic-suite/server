import { Injectable } from '@nestjs/common';
import { CreateAppListDto } from './dto/create-app-list.dto';
import { UpdateAppListDto } from './dto/update-app-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { AppList } from './entities/app-list.entity';

@Injectable()
export class AppListService {
  constructor(@InjectRepository(AppList) private readonly appListRepository: Repository<AppList>) {}
  async create(createAppListDto: CreateAppListDto) {
    const { img, name = '', desc = '' } = createAppListDto;
    const create_time = new Date().toLocaleString();
    const data = {
      img,
      name,
      desc,
      create_time,
    };
    const res = await this.appListRepository.save(data);
    return {
      code: 200,
      msg: '操作成功',
      success: true,
      data: res,
    };
  }

  async findAll(query) {
      // 查询所有-不分页
    if (Object.keys(query).length === 0) {
      const list = await this.appListRepository.find();
      return list;
    }
    const { pageSize = 10, current = 1, ...otherParams } = query;
    const where = {};
    if (otherParams.name) {
      where['name'] = Like(`%${otherParams.name}%`);
    }
    // 查询所有
    const [list, total] = await this.appListRepository.findAndCount({
      where,
      skip: pageSize * (current - 1),
      take: pageSize,
    });
    return {
      code: 200,
      msg: '操作成功',
      data: {
        list,
        pagination: {
          total,
          pageSize,
          current,
        },
      },
      success: true,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} appList`;
  }

  async update(id: number, updateAppListDto: UpdateAppListDto) {
    const { img, name = '', desc = '' } = updateAppListDto;
    const data = {
      img,
      name,
      desc,
    };
    const res = await this.appListRepository.update(id, data);
    return {
      code: 200,
      msg: '操作成功',
      success: true,
    };
  }

  async remove(id: number) {
    const res = await this.appListRepository.delete(id);
    return {
      code: 200,
      msg: '操作成功',
      success: true,
    };
  }
}
