import { IsNotEmpty } from 'class-validator';
export class CreateMidWalletFlowDto {
  @IsNotEmpty({ message: '用户id不能为空' })
  userId: number;
  @IsNotEmpty({ message: '交易类型不能为空' })
  type: number;
  @IsNotEmpty({ message: '交易状态不能为空'})
  status: number;
  @IsNotEmpty({ message: '交易金额不能为空'})
  price: number;
  @IsNotEmpty()
  beforePrice: number;
}
