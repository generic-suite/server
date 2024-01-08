import { PartialType } from '@nestjs/mapped-types';
import { CreateSysDictTypeDto } from './create-sys-dict-type.dto';

export class UpdateSysDictTypeDto extends PartialType(CreateSysDictTypeDto) {}
