import { Module } from '@nestjs/common';
import { MidBankService } from './mid-bank.service';
import { MidBankController } from './mid-bank.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MidBank } from './entities/mid-bank.entity';
@Module({
  imports: [TypeOrmModule.forFeature([MidBank])],
  controllers: [MidBankController],
  providers: [MidBankService],
})
export class MidBankModule {}
