import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(@InjectRepository(Customer) private readonly customerRepository: Repository<Customer>) {}
  async create(createCustomerDto: CreateCustomerDto) {
    const customer = {
      name: createCustomerDto.name,
      value: createCustomerDto.value,
    };
    await this.customerRepository.save(customer);
    return customer;
  }

  async findAll() {
    return await this.customerRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customerRepository.findOneBy({ id });
    customer.name = updateCustomerDto.name;
    customer.value = updateCustomerDto.value;
    await this.customerRepository.save(customer);
    return customer;
  }

  async remove(id: number) {
    await this.customerRepository.delete({ id });
    return;
  }
}
