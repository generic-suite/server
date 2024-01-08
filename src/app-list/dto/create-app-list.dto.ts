import { IsNotEmpty, IsNumber, IsString, isNotEmpty, isNumber } from 'class-validator';
export class CreateAppListDto {
  @IsNotEmpty({ message: '图片不能为空' })
  readonly img: string;

  readonly name?: string;

  readonly desc?: string;
}
