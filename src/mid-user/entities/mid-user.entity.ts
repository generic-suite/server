import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class MidUser {
  @PrimaryGeneratedColumn()
  id: number;

  // 用户id
  @Column({
    type: 'int',
    comment: '用户id',
  })
  userId: number;

  // 用户名
  @Column({
    type: 'varchar',
    length: 50,
    comment: '用户名',
  })
  username: string;

  // 用户手机号
  @Column({
    type: 'varchar',
    length: 50,
    comment: '用户手机号',
  })
  mobile: string;

  // 提现密码
  @Column({
    type: 'varchar',
    length: 255,
    comment: '提现密码',
  })
  deal_pass: string;

  // 会员id
  @Column({
    type: 'int',
    comment: '会员等级',
  })
  level_id: number;

  // 上级用户
  @Column({
    type: 'int',
    comment: '上级用户',
  })
  parent_id: number;

  // 信用分
  @Column({
    type: 'int',
    default: 100,
    comment: '信用分',
  })
  credit: number;

  // 邀请码
  @Column({
    type: 'varchar',
    length: 255,
    comment: '邀请码',
  })
  invite_code: string;

  // 状态
  @Column({
    type: 'tinyint',
    default: 1,
    comment: '状态  1-正常 2-禁用',
  })
  status: number;

  // 余额
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: '0',
    comment: '余额',
  })
  balance: string;

  // 冻结金额
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: '0',
    comment: '冻结金额',
  })
  freeze_money: string;

  // 是否允许正常交易
  @Column({
    type: 'tinyint',
    default: 1,
    comment: '是否允许正常交易  1-是 2-否',
  })
  is_allow_trade: number;

  // 交易总订单数
  @Column({
    type: 'int',
    default: 0,
    comment: '交易总订单数',
  })
  trade_order_count: number;

  // 今日交易订单数
  @Column({
    type: 'int',
    default: 0,
    comment: '今日交易订单数',
  })
  today_trade_order_count: number;

  // 每日可做任务量-根据vip等级而定
  @Column({
    type: 'int',
    default: 0,
    comment: '每日可做任务量-根据vip等级而定',
  })
  order_count: number;

  // 交易总金额
  @Column({
    type: 'decimal',
    default: '0',
    precision: 10,
    scale: 2,
    comment: '交易总金额',
  })
  trade_money: string;

  // 今日交易金额
  @Column({
    type: 'decimal',
    default: '0',
    precision: 10,
    scale: 2,
    comment: '今日交易金额',
  })
  today_trade_money: string;

  // 总佣金
  @Column({
    type: 'decimal',
    default: '0',
    precision: 10,
    scale: 2,
    comment: '总佣金',
  })
  commission_total: string;

  // 今日佣金
  @Column({
    type: 'decimal',
    default: '0',
    precision: 10,
    scale: 2,
    comment: '今日佣金',
  })
  commission_today: string;

  // 累计充值
  @Column({
    type: 'decimal',
    default: '0',
    precision: 10,
    scale: 2,
    comment: '累计充值',
  })
  recharge_money: string;

  // 累计提现
  @Column({
    type: 'decimal',
    default: '0',
    precision: 10,
    scale: 2,
    comment: '累计提现',
  })
  withdraw_money: string;

  // 是否为代理用户
  @Column({
    type: 'tinyint',
    default: 0,
    comment: '是否为代理用户 0-代理用户 1-非代理用户',
  })
  is_agent: number;

  // 是否为测试用户
  @Column({
    type: 'tinyint',
    default: 0,
    comment: '是否为测试用户  0-普通账户 1-测试账户',
  })
  is_test: number;

  // 上次登录时间
  @Column({
    type: 'timestamp',
    comment: '上次登录时间',
    nullable: true,
  })
  last_login_time: Date;

  // 登录ip
  @Column({
    type: 'varchar',
    length: 50,
    comment: '登录ip',
    nullable: true,
  })
  login_ip: string;

  // 创建时间
  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
  })
  create_time: Date;

  // 下级用户数量
  @Column({
    type: 'int',
    default: 0,
    comment: '下级用户数量',
  })
  child_count: number;
}
