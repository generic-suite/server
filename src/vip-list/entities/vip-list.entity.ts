import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class VipList {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column({
    type: 'int',
    comment: '等级',
    default: 0,
  })
  level: number;

  // 名称
  @Column({
    type: 'varchar',
    length: 50,
    comment: '名称',
  })
  name: string;

  // vip等级描述
  @Column({
    type: 'varchar',
    length: 50,
    comment: 'vip等级描述',
    nullable: true,
  })
  description: string;

  // 会员图标
  @Column({
    type: 'varchar',
    length: 500,
    comment: '图片',
    nullable: true,
  })
  img: string;

  // 限制接单金额
  @Column({
    type: 'int',
    comment: '限制接单金额',
    default: 0,
  })
  order_amount_min: number;

  // 升级奖励
  @Column({
    type: 'int',
    comment: '升级奖励',
    default: 0,
  })
  upgrade_reward: number;

  // 任务总量 - 超过任务总量，会员等级自动升级
  @Column({
    type: 'int',
    comment: '任务总量',
    default: 0,
  })
  task_total: number;

  // 每日可做订单量
  @Column({
    type: 'int',
    comment: '每日订单量',
    default: 30,
  })
  order_count: number;

  // 价格范围 0% - 100% 最低
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: '60.00',
    comment: '价格范围 0% - 100% 最低',
  })
  price_min: string;

  // 价格范围 0% - 100% 最高
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: '100.00',
    comment: '价格范围 0% - 100% 最高',
  })
  price_max: string;

  // 返还佣金比例
  @Column({
    type: 'int',
    comment: '返还佣金比例',
    default: 0,
  })
  return_rate: number;

  // 连单佣金比例
  @Column({
    type: 'int',
    comment: '连单佣金比例',
    default: 0,
  })
  continue_rate: number;

  // 提现限制
  // 提现最小限制
  @Column({
    type: 'int',
    comment: '提现最小限制',
    default: 0,
  })
  withdraw_min: number;

  // 提现最大限制
  @Column({
    type: 'int',
    comment: '提现最大限制',
    default: 0,
  })
  withdraw_max: number;

  // 一天最多允许提现的次数
  @Column({
    type: 'int',
    comment: '一天最多允许提现的次数',
    default: 0,
  })
  withdraw_count: number;

  // 提现至少完成订单量/天   0表示不限制
  @Column({
    type: 'int',
    comment: '提现至少完成订单量/天',
    default: 0,
  })
  withdraw_order_count: number;

  // 提现手续费
  @Column({
    type: 'int',
    comment: '提现手续费',
    default: 0,
  })
  withdraw_fee: number;

  // 会员状态（0正常 1停用）
  @Column({
    type: 'int',
    comment: '会员状态（0正常 1停用）',
    default: 0,
  })
  status: number;
}
