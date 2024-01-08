import { Injectable } from '@nestjs/common';
import { CreateCommodityDto } from './dto/create-commodity.dto';
import { UpdateCommodityDto } from './dto/update-commodity.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Commodity } from './entities/commodity.entity';

@Injectable()
export class CommodityService {
  constructor(@InjectRepository(Commodity) private readonly commodityRepository: Repository<Commodity>) {}
  /**
   * 创建商品
   *
   * @param {*} body
   * @param {string} username
   * @returns {Promise<any>}
   */
  async create(body: any, username: string): Promise<any> {
    const { name, description = '', marketPrice = 0, saleMoney = 0 } = body;
    const commodity = {
      commodity_name: name,
      commodity_desc: description,
      market_price: marketPrice,
      sale_money: saleMoney,
      c_by: username,
      c_time: new Date(),
    };
    const newCommodity = await this.commodityRepository.save(commodity);
    return {
      code: 200,
      msg: '创建成功',
      success: true,
    };
  }
  /**
   * 查询商品列表
   * @param {*} body
   * @param {string} username
   * @returns {Promise<any>}
   */
  async findAll(body: any): Promise<any> {
    const { pageIndex = 1, pageSize = 10, keywords = '' } = body;
    const currentIndex = (pageIndex - 1) * pageSize < 0 ? 0 : (pageIndex - 1) * pageSize;
    const list = await this.commodityRepository.findAndCount({
      where: {
        commodity_name: Like(`%${keywords}%`),
      },
      skip: currentIndex,
      take: pageSize,
    });
    const resData = {
      list: list[0],
      total: list[1],
      pageIndex: pageIndex,
    };
    return {
      code: 200,
      data: resData,
      success: true,
      msg: '查询成功',
    };
  }

  /**
   * 修改商品
   *
   * @param {*} body
   * @param {string} username
   * @returns
   */
  async update(id, body: any, username: string) {
    // 根据id查到商品详情
    const commodity = await this.commodityRepository.findOne({ where: { id } });
    console.log('🚀  69  :', commodity);
    if (!commodity) {
      return {
        code: 400,
        msg: '商品不存在',
        success: false,
      };
    }
    const { name, description = '', marketPrice = 0, saleMoney = 0 } = body;
    const newCommodity = {
      commodity_name: name,
      commodity_desc: description,
      market_price: marketPrice,
      sale_money: saleMoney,
      u_by: username,
      u_time: new Date(),
    };
    await this.commodityRepository.update(id, newCommodity);
    return {
      code: 200,
      msg: '修改成功',
      success: true,
    };
  }

  /**
   * 删除商品
   *
   * @param {*} ids
   * @returns
   */
  async remove(ids: string) {
    // 删除商品
    // 如果 ids 是数组，则删除多个商品，如果 ids 不是数组，则删除单个商品
    const idList = ids.split(',');
    await this.commodityRepository.delete(idList);
    return {
      code: 200,
      msg: '删除成功',
      success: true,
    };
  }
}
