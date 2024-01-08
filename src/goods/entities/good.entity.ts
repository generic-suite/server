import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity()
export class Good {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  // 产品名称
  @Column({
    type: 'varchar',
    length: 100,
    comment: '商品名称',
  })
  good_name: string;

  // 产品图片
  @Column({
    type: 'varchar',
    length: 100,
    comment: '商品图片',
  })
  good_img: string;

  // 价格
  @Column({
    type: 'int',
    comment: '价格',
  })
  price: number;

  // 创建时间
  @Column({
    type: 'varchar',
    length: 100,
    comment: '创建时间',
  })
  create_time: string;

  // 更新时间
  @Column({
    type: 'varchar',
    length: 100,
    comment: '更新时间',
  })
  update_time: string;

  // 产品描述
  @Column({
    type: 'varchar',
    length: 100,
    comment: '产品描述',
    nullable: true, // 可选的属性
  })
  good_desc: string;
}
