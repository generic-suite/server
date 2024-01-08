import { IsNotEmpty, IsNumber, IsString, isNotEmpty, isNumber } from 'class-validator';
export class CreateSysDictTypeDto {
  @IsNotEmpty({ message: '字典名称不能为空' })
  readonly dict_name: string;

  @IsNotEmpty({ message: '字典类型不能为空' })
  readonly dict_type: string;

  @IsNotEmpty({ message: '状态 不能为空' })
  @IsNumber({}, { message: '状态 必须是 数字' })
  readonly status: number;

  readonly remark?: string;

  readonly create_by?: string;

  readonly create_time?: Date;

  readonly update_by?: string;

  readonly update_time?: Date;
  
}
