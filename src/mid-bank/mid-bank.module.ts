import { Module } from '@nestjs/common';
import { MidBankService } from './mid-bank.service';
import { MidBankController } from './mid-bank.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MidBank } from './entities/mid-bank.entity';
import { MidUserModule } from 'src/mid-user/mid-user.module';
@Module({
  imports: [TypeOrmModule.forFeature([MidBank]), MidUserModule],
  controllers: [MidBankController],
  providers: [MidBankService],
  exports: [MidBankService],
})
export class MidBankModule {}
