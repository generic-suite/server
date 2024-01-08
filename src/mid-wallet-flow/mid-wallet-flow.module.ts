import { Module } from '@nestjs/common';
import { MidWalletFlowService } from './mid-wallet-flow.service';
import { MidWalletFlowController } from './mid-wallet-flow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MidWalletFlow } from './entities/mid-wallet-flow.entity';
@Module({
  imports: [TypeOrmModule.forFeature([MidWalletFlow])],
  controllers: [MidWalletFlowController],
  providers: [MidWalletFlowService],
  exports: [MidWalletFlowService],
})
export class MidWalletFlowModule {}
