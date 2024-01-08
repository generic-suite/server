import { Module } from '@nestjs/common';
import { MidOrderService } from './mid-order.service';
import { MidOrderController } from './mid-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MidOrder } from './entities/mid-order.entity';

import { MidVipModule } from 'src/mid-vip/mid-vip.module';
import { VipListModule } from 'src/vip-list/vip-list.module';
import { GoodsModule } from 'src/goods/goods.module';
import { MidUserModule } from 'src/mid-user/mid-user.module';
@Module({
  imports: [TypeOrmModule.forFeature([MidOrder]), MidVipModule, VipListModule, GoodsModule, MidUserModule],
  controllers: [MidOrderController],
  providers: [MidOrderService],
})
export class MidOrderModule {}
