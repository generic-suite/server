import { PartialType } from '@nestjs/mapped-types';
import { CreateSysDictDatumDto } from './create-sys-dict-datum.dto';

export class UpdateSysDictDatumDto extends PartialType(CreateSysDictDatumDto) {}
