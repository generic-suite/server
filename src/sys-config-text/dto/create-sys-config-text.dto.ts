import { IsNotEmpty, IsNumber, IsString, isNotEmpty, isNumber } from 'class-validator';
export class CreateSysConfigTextDto {
  @IsNotEmpty({ message: '类型不能为空' })
  readonly config_type: string;

  @IsNotEmpty({ message: '语言不能为空' })
  readonly lang: string;

  readonly content: string;
}
