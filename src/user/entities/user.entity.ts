import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity()
export class User {
  // 用户id
  @PrimaryGeneratedColumn()
  userId: number;

  // 用户名
  @Column({
    type: 'varchar',
    length: 50,
    comment: '用户名',
  })
  username: string;

  // 真实姓名
  @Column({
    type: 'varchar',
    length: 50,
    comment: '真实姓名',
  })
  realname: string;

  // 密码
  @Exclude()
  @Column({
    type: 'varchar',
    length: 255,
    comment: '密码',
  })
  password: string;

  // 密码盐
  @Exclude()
  @Column({
    type: 'varchar',
    length: 255,
    comment: '密码盐',
  })
  passwordSalt: string;

  // 手机号
  @Column({
    type: 'varchar',
    length: 50,
    comment: '手机号',
    nullable: true,
  })
  mobile: string;

  // 用户角色 tinyint 0-超级管理员|1-管理员|2-开发&测试&运营|3-普通用户（只能查看）
  @Exclude()
  @Column({
    type: 'tinyint',
    default: 3,
    comment: '用户角色',
  })
  role: number;

  // 用户状态 tinyint 0-失效|1-有效|2-删除
  @Exclude()
  @Column({
    type: 'tinyint',
    default: 1,
    comment: '用户状态',
  })
  userStatus: number;

  // 创建人
  @Column({
    type: 'varchar',
    length: 50,
    comment: '创建人',
    nullable: true,
  })
  createBy: string;

  // 创建时间
  @Column({
    type: 'timestamp',
    comment: '创建时间',
    nullable: true,
  })
  createTime: Date;

  // 更新人
  @Column({
    type: 'varchar',
    length: 50,
    comment: '更新人',
    nullable: true,
  })
  updateBy: string;

  // 更新时间
  @Column({
    type: 'timestamp',
    comment: '更新时间',
    nullable: true,
  })
  updateTime: Date;
}
