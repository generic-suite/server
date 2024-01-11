import { IsNotEmpty, IsNumber, IsString, isNotEmpty, isNumber } from 'class-validator';
export class CreateCustomerDto {
  @IsNotEmpty({ message: '客服名称不能为空' })
  readonly name?: string;

  @IsNotEmpty({ message: '客服地址不能为空' })
  readonly value?: string;
}
