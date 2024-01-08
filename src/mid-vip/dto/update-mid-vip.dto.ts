import { PartialType } from '@nestjs/mapped-types';
import { CreateMidVipDto } from './create-mid-vip.dto';

export class UpdateMidVipDto extends PartialType(CreateMidVipDto) {}
