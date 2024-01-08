import { Module } from '@nestjs/common';
import { AppListService } from './app-list.service';
import { AppListController } from './app-list.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppList } from './entities/app-list.entity';
@Module({
  imports: [TypeOrmModule.forFeature([AppList])],
  controllers: [AppListController],
  providers: [AppListService],
})
export class AppListModule {}
