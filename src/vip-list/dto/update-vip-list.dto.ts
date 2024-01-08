import { IsNotEmpty, IsNumber, IsString, isNotEmpty, isNumber } from 'class-validator';
export class UpdateVipListDto {
  @IsNotEmpty({ message: '会员名称不能为空' })
  readonly name: string;

  @IsNotEmpty({ message: '会员图片不能为空' })
  readonly img: string;
}
