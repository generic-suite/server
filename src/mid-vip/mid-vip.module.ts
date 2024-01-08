import { Module } from '@nestjs/common';
import { MidVipService } from './mid-vip.service';
import { MidVipController } from './mid-vip.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MidVip } from './entities/mid-vip.entity';

import { VipListModule } from 'src/vip-list/vip-list.module';
@Module({
  imports: [TypeOrmModule.forFeature([MidVip]), VipListModule],
  controllers: [MidVipController],
  providers: [MidVipService],
  exports: [MidVipService],
})
export class MidVipModule {}
