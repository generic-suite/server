import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity()
export class Commodity {
  // id
  @PrimaryGeneratedColumn()
  id: number;

  // 商品名字
  @Column({
    type: 'varchar',
    length: 50,
    comment: '商品名字',
  })
  commodity_name: string;

  // 商品描述
  @Column({
    type: 'varchar',
    length: 255,
    comment: '商品描述',
  })
  commodity_desc: string;

  // 公布价格
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: '公布价格',
  })
  market_price: number;

  // 销售价格
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: '销售价格',
  })
  sale_money: number;

  // 创建人
  @Column({
    type: 'varchar',
    length: 50,
    comment: '创建人',
    nullable: true,
  })
  c_by: string;

  // 创建时间
  @Column({
    type: 'datetime',
    comment: '创建时间',
    nullable: true,
  })
  c_time: Date;

  // 更新人
  @Column({
    type: 'varchar',
    length: 50,
    comment: '更新人',
    nullable: true,
  })
  u_by: string;

  // 更新时间
  @Column({
    type: 'datetime',
    comment: '更新时间',
    nullable: true,
  })
  u_time: Date;
}
