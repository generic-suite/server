import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class MidWithdraw {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  // 用户id
  @Column({
    type: 'int',
    comment: '用户id',
  })
  user_id: number;

  // 用户名
  @Column({
    type: 'varchar',
    length: 50,
    comment: '用户名',
    default: '',
  })
  username: string;

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

  // 提现金额
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: '提现金额',
  })
  amount: string;

  // 手续费
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: '手续费',
  })
  fee: string;

  // 提现状态
  @Column({
    type: 'int',
    comment: '提现状态 0:待审核 1:审核通过 2:审核不通过',
    default: 0,
  })
  status: number;

  // 审核信息
  @Column({
    type: 'varchar',
    length: 255,
    comment: '审核信息',
    default: '',
  })
  audit_info: string;

  // 审核人
  @Column({
    type: 'varchar',
    length: 50,
    comment: '审核人',
    default: '',
  })
  audit_user: string;

  // 审核时间
  @Column({
    type: 'datetime',
    comment: '审核时间',
    nullable: true,
  })
  audit_time: Date;

  // 提现申请时间
  @CreateDateColumn({
    comment: '提现申请时间',
  })
  created_at: Date;
}
