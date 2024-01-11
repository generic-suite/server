import { IsNotEmpty, IsNumber, IsString, isNotEmpty, isNumber } from 'class-validator';
export class CreateMidWithdrawDto {
  @IsNotEmpty({ message: '提现金额不能为空' })
  readonly amount?: number;

  @IsNotEmpty({ message: '提现密码不能为空' })
  readonly deal_pass?: string;
}
