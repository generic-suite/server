import { IsNumber, IsString, IsBoolean } from 'class-validator';

export class ChangeBalanceDto {
  userId: number;

  @IsNumber({}, { message: '加扣款金额必须是数字' })
  amount: number;

  @IsBoolean({ message: '加扣款类型必须是布尔值' })
  isRecharge: boolean;
}
