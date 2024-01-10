import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class MidBank {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  // 用户id
  @Column({
    type: 'int',
    comment: '用户id',
  })
  user_id: number;

  // 银行名称
  @Column({
    type: 'varchar',
    length: 50,
    comment: '银行名称',
    default: '',
  })
  bank_name: string;

  // 银行卡号
  @Column({
    type: 'varchar',
    length: 50,
    comment: '银行卡号',
    default: '',
  })
  bank_card: string;

  // 银行账户名
  @Column({
    type: 'varchar',
    length: 50,
    comment: '银行账户名',
    default: '',
  })
  bank_account: string;

  // 分行名称
  @Column({
    type: 'varchar',
    length: 50,
    comment: '分行名称',
    default: '',
  })
  branch_name: string;

  // 分行代码
  @Column({
    type: 'varchar',
    length: 50,
    comment: '分行代码',
    default: '',
  })
  branch_number: string;

  // 备注
  @Column({
    type: 'varchar',
    length: 500,
    comment: '备注',
    nullable: true,
  })
  remark: string;

  // 创建时间
  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  // 更新时间
  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}
