import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  // 客服名称
  @Column({
    type: 'varchar',
    length: 50,
    comment: '客服名称',
    default: '',
  })
  name: string;

  // 客服地址
  @Column({
    type: 'varchar',
    length: 50,
    comment: '客服地址',
    default: '',
  })
  value: string;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
    name: 'create_time',
  })
  create_time: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    comment: '更新时间',
    name: 'update_time',
  })
  update_time: Date;
}
