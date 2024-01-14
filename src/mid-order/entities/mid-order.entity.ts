import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity()
export class MidOrder {
  @PrimaryGeneratedColumn()
  @Exclude()
  order_id: number;

  // 订单编号
  @Column({
    type: 'varchar',
    length: 50,
    comment: '订单编号',
  })
  order_no: string;

  // 用户id
  @Column({
    type: 'int',
    comment: '用户id',
  })
  user_id: number;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '用户名',
  })
  username: string;

  // 商品id
  @Column({
    type: 'int',
    comment: '商品id',
  })
  goods_id: number;

  // 商品名称
  @Column({
    type: 'varchar',
    length: 50,
    comment: '商品名称',
  })
  goods_name: string;

  // 商品数量
  @Column({
    type: 'int',
    comment: '商品数量',
  })
  goods_num: number;

  // 商品图片
  @Column({
    type: 'varchar',
    length: 255,
    comment: '商品图片',
  })
  goods_img: string;

  // 订单金额
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: '订单金额',
  })
  order_amount: string;

  // 订单佣金
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: '订单佣金',
  })
  order_commission: string;

  // 订单状态  1-未付款  2-交易完成
  @Column({
    type: 'int',
    comment: '订单状态  1-未付款  2-交易完成',
  })
  order_status: number;

  // 返佣状态 1-未返佣 2-已返佣
  @Column({
    type: 'int',
    comment: '返佣状态 1-未返佣 2-已返佣',
  })
  commission_status: number;

  // 订单完成时间
  @Column({
    type: 'datetime',
    comment: '订单完成时间',
    nullable: true,
  })
  order_time: Date;

  // 创建时间
  @CreateDateColumn()
  create_time: Date;

  // 更新时间
  @UpdateDateColumn()
  update_time: Date;
}
