import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class RegisterInfoDTO {
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly username: string;
  @IsNotEmpty({ message: '真实姓名不能为空' })
  @IsString({ message: '真实姓名必须是 String 类型' })
  readonly realname: string;
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
  @IsNotEmpty({ message: '确认密码不能为空' })
  readonly repassword: string;
  @IsNotEmpty({ message: '手机号不能为空' })
  readonly mobile: string;
  @IsNotEmpty({ message: '提现密码不能为空' })
  readonly deal_pass: string;
  readonly role?: string | number;
  readonly invite_code?: string;
}

export class ChangePasswordDTO {
  @IsNumber({}, { message: '类型必须是数字' })
  readonly type: number; // 1:登录密码 2:交易密码
  @IsNotEmpty({ message: '旧密码不能为空' })
  readonly oldPassword: string;
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
  @IsNotEmpty({ message: '确认密码不能为空' })
  readonly repassword: string;
}
