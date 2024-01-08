import { Module } from '@nestjs/common';
import { CommodityService } from './commodity.service';
import { CommodityController } from './commodity.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Commodity } from './entities/commodity.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Commodity])], // 导入数据库
  controllers: [CommodityController],
  providers: [CommodityService],
})
export class CommodityModule {}
