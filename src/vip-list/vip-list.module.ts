import { Module } from '@nestjs/common';
import { VipListService } from './vip-list.service';
import { VipListController } from './vip-list.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { VipList } from './entities/vip-list.entity';
@Module({
  imports: [TypeOrmModule.forFeature([VipList])],
  controllers: [VipListController],
  providers: [VipListService],
  exports: [VipListService], // 将VipService导出，供其他模块使用
})
export class VipListModule {}
