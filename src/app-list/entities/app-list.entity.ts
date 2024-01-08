import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity()
export class AppList {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  // 图片
  @Column({
    type: 'varchar',
    length: 100,
    comment: '图片',
  })
  img: string;

  // 名称
  @Column({
    type: 'varchar',
    length: 100,
    comment: '名称',
    nullable: true, // 可选的属性
  })
  name: string;

  // 介绍
  @Column({
    type: 'varchar',
    length: 100,
    comment: '介绍',
    nullable: true, // 可选的属性
  })
  desc: string;

  // 创建时间
  @Column({
    type: 'varchar',
    length: 100,
    comment: '创建时间',
  })
  create_time: string;

}
