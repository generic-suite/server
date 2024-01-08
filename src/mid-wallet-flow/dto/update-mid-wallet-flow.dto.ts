import { PartialType } from '@nestjs/mapped-types';
import { CreateMidWalletFlowDto } from './create-mid-wallet-flow.dto';

export class UpdateMidWalletFlowDto extends PartialType(CreateMidWalletFlowDto) {}
