import { Module } from '@nestjs/common';
import { SysDictTypeService } from './sys-dict-type.service';
import { SysDictTypeController } from './sys-dict-type.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { SysDictType } from './entities/sys-dict-type.entity';
@Module({
  imports: [TypeOrmModule.forFeature([SysDictType])],
  controllers: [SysDictTypeController],
  providers: [SysDictTypeService],
})
export class SysDictTypeModule {}
