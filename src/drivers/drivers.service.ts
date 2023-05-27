import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private readonly driversRepository: Repository<Driver>,
  ) {}

  public async findAll() {
    return await this.driversRepository.find();
  }

  public async createAll(drivers: Driver[]) {
    return await this.driversRepository.save(drivers);
  }
}