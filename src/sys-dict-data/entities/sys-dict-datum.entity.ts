import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity()
export class SysDictData {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  // 字典label
  @Column({
    type: 'varchar',
    length: 100,
    comment: '字典label',
  })
  dict_label: string;

  // 字典值
  @Column({
    type: 'varchar',
    length: 100,
    comment: '字典值',
  })
  dict_value: string;

  // 字典类型
  @Column({
    type: 'varchar',
    length: 100,
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
}
