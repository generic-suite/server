import { PartialType } from '@nestjs/mapped-types';
import { CreateMidUserDto } from './create-mid-user.dto';

export class UpdateMidUserDto extends PartialType(CreateMidUserDto) {
  // vip等级
  readonly level_id: number;

  // 上级用户id
  readonly parent_id: number;

  // 信用分
  readonly credit: number;

  // 状态
  readonly status: number;

  // 交易状态
  readonly is_allow_trade: number;

}
