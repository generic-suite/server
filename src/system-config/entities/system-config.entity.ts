import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class SystemConfig {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  // app名称
  @Column({
    type: 'varchar',
    length: 50,
    comment: 'app名称',
    default: '系统名字',
  })
  app_name: string;

  // logo 文件地址 - 非必填
  @Column({
    type: 'varchar',
    length: 255,
    comment: 'logo 文件地址',
    nullable: true,
  })
  logo_url: string;

  // 开盘时间
  @Column({
    type: 'varchar',
    length: 50,
    comment: '开盘时间',
    default: '09:00',
  })
  open_time: string;

  // 闭盘时间
  @Column({
    type: 'varchar',
    length: 50,
    comment: '闭盘时间',
    default: '23:00',
  })
  close_time: string;

  // 提现-开始时间
  @Column({
    type: 'varchar',
    length: 50,
    comment: '提现-开始时间',
    default: '09:00',
  })
  withdraw_start_time: string;

  // 提现-结束时间
  @Column({
    type: 'varchar',
    length: 50,
    comment: '提现-结束时间',
    default: '23:00',
  })
  withdraw_end_time: string;

  // 注册奖励
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: '注册奖励',
    default: 0,
  })
  register_reward: number;

  // 返佣倍数
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: '返佣倍数 -- 设置卡单或者连单用户才会生效',
    default: 0,
  })
  rebate_multiple: number;

  // 一级会员返佣比例
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: '一级返佣比例',
    default: 1.0,
  })
  first_rebate_ratio: number;

  // 二级会员返佣比例
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: '二级返佣比例',
    default: 1.5,
  })
  second_rebate_ratio: number;

  // 三级会员返佣比例
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: '三级返佣比例',
    default: 2.0,
  })
  third_rebate_ratio: number;

  // 四级会员返佣比例
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: '四级返佣比例',
    default: 2.5,
  })
  fourth_rebate_ratio: number;

  // 五级会员返佣比例
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: '五级返佣比例',
    default: 3.0,
  })
  fifth_rebate_ratio: number;
}
