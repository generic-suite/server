import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Entity } from 'typeorm';
@Entity()
export class MidWalletFlow {
  @PrimaryGeneratedColumn()
  id: number;

  // 用户id
  @Column()
  userId: number;

  @Column()
  username: string;

  // 订单id
  @Column({
    type: 'int',
    comment: '订单id',
    nullable: true,
  })
  orderId: number;

  // 交易类型
  @Column({
    type: 'tinyint',
    comment: '交易类型 1:充值 2:提现 3:交易 4:交易佣金',
  })
  type: number;

  // 交易状态 收入/支出
  @Column({
    type: 'tinyint',
    comment: '交易状态 1:收入 2:支出',
  })
  status: number;

  // 交易金额
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: '交易金额',
  })
  price: number;

  // 交易前余额
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: '交易前余额',
  })
  beforePrice: number;

  // 交易说明
  @Column({
    type: 'varchar',
    length: 255,
    comment: '交易说明',
    nullable: true,
  })
  remark: string;

  // 创建时间
  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
  })
  createTime: Date;
}
