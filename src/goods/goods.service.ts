import { Injectable } from '@nestjs/common';
import { CreateGoodDto } from './dto/create-good.dto';
import { UpdateGoodDto } from './dto/update-good.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Good } from './entities/good.entity';

@Injectable()
export class GoodsService {
  constructor(@InjectRepository(Good) private readonly goodRepository: Repository<Good>) {}
  async create(createGoodDto: CreateGoodDto) {
    const { good_name, img, price, good_desc = '' } = createGoodDto;
    const good = {
      good_name: good_name,
      good_img: img,
      price: price,
      good_desc: good_desc,
      create_time: new Date().toLocaleString(),
      update_time: new Date().toLocaleString(),
    };
    console.log('fsafasfsa', good);
    await this.goodRepository.save(good);
    return {
      code: 200,
      msg: '添加成功',
      success: true,
    };
  }

  async findAll(query) {
    const { pageSize = 10, current = 1, ...otherParams } = query;

    const where = {};
    if (otherParams.good_name) {
      where['good_name'] = Like(`%${otherParams.good_name}%`);
    }

    const [list, total] = await this.goodRepository.findAndCount({
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
      msg: '操作成功',
    };
  }

  async findOne(id: number) {
    return await this.goodRepository.findOneById(id);
  }

  async update(id: number, updateGoodDto: UpdateGoodDto) {
    // 改数据
    const { good_name, img, price, good_desc = '' } = updateGoodDto;
    const good = {
      good_name: good_name,
      good_img: img,
      price: price,
      good_desc: good_desc,
      update_time: new Date().toLocaleString(),
    };
    await this.goodRepository.update(id, good);
    return {
      code: 200,
      msg: '操作成功',
      success: true,
    };
  }

  async remove(id: number) {
    await this.goodRepository.delete(id);
    return {
      code: 200,
      msg: '操作成功',
      success: true,
    };
  }

  // 查找数据库中所有的商品--提供给订单服务使用
  async findAllGoods() {
    const data = await this.goodRepository.find();
    return data;
  }
}
