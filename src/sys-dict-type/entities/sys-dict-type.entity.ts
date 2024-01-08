import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity()
export class SysDictType {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  // 字典名称
  @Column({
    type: 'varchar',
    length: 50,
    comment: '字典名称',
  })
  dict_name: string;

  // 字典类型
  @Column({
    type: 'varchar',
    length: 50,
    comment: '字典类型',
  })
  dict_type: string;

  // 状态（0正常 1停用）
  @Column({
    type: 'int',
    comment: '状态（0正常 1停用）',
    default: 0,
  })
  status: number;

  // 备注
  @Column({
    type: 'varchar',
    length: 500,
    comment: '备注',
    nullable: true,
  })
  remark: string;

  // 创建者
  @Column({
    type: 'varchar',
    length: 50,
    comment: '创建者',
    nullable: true,
  })
  create_by: string;

  // 创建时间
  @Column({
    type: 'datetime',
    comment: '创建时间',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  create_time: Date;

  // 更新者
  @Column({
    type: 'varchar',
    length: 50,
    comment: '更新者',
    nullable: true,
  })
  update_by: string;

  // 更新时间
  @Column({
    type: 'datetime',
    comment: '更新时间',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  update_time: Date;

}
