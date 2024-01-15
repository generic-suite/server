import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity()
export class SysConfigText {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  // 配置项类型-实际以字典表为准
  // 1. 证书 2. 最新活动 3. 首页弹窗 4. 规则 5. 介绍 6. 关于我们 7. 系统提示 8. 注册条款 9. 充值消息 10. 注册协议
  @Column({
    type: 'varchar',
    length: 100,
    comment:
      '配置项类型  1. 证书 2. 最新活动 3. 首页弹窗 4. 规则 5. 介绍 6. 关于我们 7. 系统提示 8. 注册条款 9. 充值消息 10. 注册协议',
  })
  config_type: string;

  // 语言
  @Column({
    type: 'varchar',
    length: 100,
    comment: '语言',
  })
  lang: string;

  // 配置项值
  @Column({
    type: 'varchar',
    length: 100,
    comment: '配置项值',
  })
  content: string;
}
