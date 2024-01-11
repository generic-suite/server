import { PartialType } from '@nestjs/mapped-types';
import { CreateMidWithdrawDto } from './create-mid-withdraw.dto';

export class UpdateMidWithdrawDto extends PartialType(CreateMidWithdrawDto) {}
