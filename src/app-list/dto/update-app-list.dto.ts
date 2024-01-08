import { PartialType } from '@nestjs/mapped-types';
import { CreateAppListDto } from './create-app-list.dto';

export class UpdateAppListDto extends PartialType(CreateAppListDto) {}
