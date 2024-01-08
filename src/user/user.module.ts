import { Module } from '@nestjs/common';
import { UserService } from './user.service';
// import { UserController } from './user.controller';


import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User])], // 导入数据库
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
