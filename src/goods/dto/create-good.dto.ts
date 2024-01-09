import { IsNotEmpty, IsNumber, IsString, isNotEmpty, isNumber } from 'class-validator';

export class CreateGoodDto {
  @IsNotEmpty({ message: '商品名称不能为空' })
  readonly good_name: string;

  @IsNotEmpty({ message: '商品图片不能为空' })
  readonly good_img: string;

  @IsNotEmpty({ message: '价格不能为空' })
  readonly price: number;

  // 可选的属性不需要加上@IsNotEmpty() 装饰器
  readonly good_desc?: string;
}
