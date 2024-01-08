import { PartialType } from '@nestjs/mapped-types';
import { CreateSysConfigTextDto } from './create-sys-config-text.dto';

export class UpdateSysConfigTextDto extends PartialType(CreateSysConfigTextDto) {}
