import { Module } from '@nestjs/common';
import { MidWithdrawService } from './mid-withdraw.service';
import { MidWithdrawController } from './mid-withdraw.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { MidWithdraw } from './entities/mid-withdraw.entity';
import { MidUserModule } from 'src/mid-user/mid-user.module';
import { MidBankModule } from 'src/mid-bank/mid-bank.module';
@Module({
  imports: [TypeOrmModule.forFeature([MidWithdraw]), MidUserModule, MidBankModule],
  controllers: [MidWithdrawController],
  providers: [MidWithdrawService],
})
export class MidWithdrawModule {}
