import { PartialType } from '@nestjs/mapped-types';
import { CreateMidOrderDto } from './create-mid-order.dto';

export class UpdateMidOrderDto extends PartialType(CreateMidOrderDto) {}
