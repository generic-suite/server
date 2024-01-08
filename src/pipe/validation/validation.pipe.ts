import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Logger } from 'src/utils/log4js';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    console.log(`value:`, value, `metadata:`, metadata);
    if (!metadata || !this.toValidate(metadata.metatype)) {
      // 没有传入验证规则，不验证，直接返回
      return value;
    }

    const object = plainToClass(metadata.metatype, value); // 将对象转换为 Class 来验证
    const errors = await validate(object); // 验证对象，如果失败则抛出异常
    if (errors.length > 0) {
      // 获取第一个错误信息
      const msg = Object.values(errors[0].constraints)[0]; // 只需要取第一个错误信息并返回即可
      Logger.info(`Validation failed: ${msg}`);
      throw new BadRequestException(`Validation failed: ${msg}`);
    }
    return value;
  }
  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
