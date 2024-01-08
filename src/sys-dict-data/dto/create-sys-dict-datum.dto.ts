import { IsNotEmpty, IsNumber, IsString, isNotEmpty, isNumber } from 'class-validator';

export class CreateSysDictDatumDto {
  @IsNotEmpty({ message: '字典名称不能为空' })
  readonly dict_label: string;

  @IsNotEmpty({ message: '字典值不能为空' })
  readonly dict_value: string;

  @IsNotEmpty({ message: '字典类型不能为空' })
  readonly dict_type: string;
}
