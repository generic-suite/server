import { Module } from '@nestjs/common';
import { SysDictDataService } from './sys-dict-data.service';
import { SysDictDataController } from './sys-dict-data.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { SysDictData } from './entities/sys-dict-datum.entity';
import { SysDictType } from '../sys-dict-type/entities/sys-dict-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SysDictData, SysDictType])],
  controllers: [SysDictDataController],
  providers: [SysDictDataService],
})
export class SysDictDataModule {}
