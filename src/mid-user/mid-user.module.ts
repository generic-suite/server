import { Module } from '@nestjs/common';
import { MidUserService } from './mid-user.service';
import { MidUserController } from './mid-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MidUser } from './entities/mid-user.entity';

import { VipListModule } from 'src/vip-list/vip-list.module';
import { MidWalletFlowModule } from 'src/mid-wallet-flow/mid-wallet-flow.module';

// 事件发射器
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [TypeOrmModule.forFeature([MidUser]), EventEmitterModule.forRoot(), VipListModule, MidWalletFlowModule],
  controllers: [MidUserController],
  providers: [MidUserService],
  exports: [MidUserService],
})
export class MidUserModule {}
