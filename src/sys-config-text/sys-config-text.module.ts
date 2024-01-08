import { Module } from '@nestjs/common';
import { SysConfigTextService } from './sys-config-text.service';
import { SysConfigTextController } from './sys-config-text.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysConfigText } from './entities/sys-config-text.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SysConfigText])],
  controllers: [SysConfigTextController],
  providers: [SysConfigTextService],
})
export class SysConfigTextModule {}
