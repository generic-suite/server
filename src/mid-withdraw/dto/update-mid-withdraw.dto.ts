import { PartialType } from '@nestjs/mapped-types';
import { CreateMidWithdrawDto } from './create-mid-withdraw.dto';
import { IsNotEmpty, IsNumber, IsString, isNotEmpty, isNumber } from 'class-validator';

export class UpdateMidWithdrawDto extends PartialType(CreateMidWithdrawDto) {
  @IsNotEmpty({ message: '提现金额不能为空' })
  readonly status: number;

  readonly audit_info?: string;
}
