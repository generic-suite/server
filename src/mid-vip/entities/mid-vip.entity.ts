import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity()
export class MidVip {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  // 用户ID
  @Column({
    type: 'int',
    comment: '用户ID',
  })
  user_id: number;

  // vip等级id
  @Column({
    type: 'int',
    comment: 'vip等级id',
  })
  vip_id: number;
}
