
import { IsNotEmpty, IsNumber, IsString, isNotEmpty, isNumber } from 'class-validator';
export class SaveMidBankDto {
  // @IsNotEmpty({ message: '银行名称不能为空' })
  readonly bank_name?: string;

  // @IsNotEmpty({ message: '银行卡号不能为空' })
  readonly bank_card?: string;

  // @IsNotEmpty({ message: '银行账户名不能为空' })
  readonly bank_account?: string;

  // @IsNotEmpty({ message: '分行名称不能为空' })
  readonly branch_name?: string;

  // @IsNotEmpty({ message: '分行代码不能为空' })
  readonly branch_number?: string;
}
