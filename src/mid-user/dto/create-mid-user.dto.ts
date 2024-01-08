import { IsNotEmpty, isNotEmpty } from 'class-validator';
export class CreateMidUserDto {
  readonly username: string;

  readonly mobile: string;

  readonly deal_pass: string;
}
