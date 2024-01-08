import { IsNotEmpty, IsNumber, IsString, isNotEmpty, isNumber } from 'class-validator';

export class CreateSystemConfigDto {
  @IsNotEmpty({ message: 'app名称不能为空' })
  readonly app_name: string;

  readonly logo_url?: string;

  @IsNotEmpty({ message: '开盘时间不能为空' })
  readonly open_time: string;

  @IsNotEmpty({ message: '闭盘时间不能为空' })
  readonly close_time: string;

  @IsNotEmpty({ message: '提现-开始时间不能为空' })
  readonly withdraw_start_time: string;

  @IsNotEmpty({ message: '提现-结束时间不能为空' })
  readonly withdraw_end_time: string;

  @IsNotEmpty({ message: '注册奖励不能为空' })
  @IsNumber({}, { message: '注册奖励必须是 数字' })
  readonly register_reward: number;

  @IsNotEmpty({ message: '返佣倍数不能为空' })
  @IsNumber({}, { message: '返佣倍数必须是 数字' })
  readonly rebate_multiple: number;

  @IsNotEmpty({ message: '一级返佣比例不能为空' })
  @IsNumber({}, { message: '一级返佣比例必须是 数字' })
  readonly first_rebate_ratio: number;

  @IsNotEmpty({ message: '二级返佣比例不能为空' })
  @IsNumber({}, { message: '二级返佣比例必须是 数字' })
  readonly second_rebate_ratio: number;

  @IsNotEmpty({ message: '三级返佣比例不能为空' })
  @IsNumber({}, { message: '三级返佣比例必须是 数字' })
  readonly third_rebate_ratio: number;

  @IsNotEmpty({ message: '四级返佣比例不能为空' })
  @IsNumber({}, { message: '四级返佣比例必须是 数字' })
  readonly fourth_rebate_ratio: number;

  @IsNotEmpty({ message: '五级返佣比例不能为空' })
  @IsNumber({}, { message: '五级返佣比例必须是 数字' })
  readonly fifth_rebate_ratio: number;
}
