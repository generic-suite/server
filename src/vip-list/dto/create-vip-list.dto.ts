import { IsNotEmpty, IsNumber, IsString, isNotEmpty, isNumber } from 'class-validator';
export class CreateVipListDto {
  @IsNotEmpty({ message: '会员名称不能为空' })
  readonly name: string;

  @IsNotEmpty({ message: '会员图片不能为空' })
  readonly img: string;

  @IsNotEmpty({ message: '会员等级不能为空' })
  @IsNumber({}, { message: '会员等级必须为数字' })
  readonly level: number;
}
