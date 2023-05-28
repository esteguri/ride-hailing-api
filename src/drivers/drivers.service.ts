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

  public async findById(id: string) {
    return await this.driversRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async findByEmail(email: string) {
    return await this.driversRepository.findOne({
      where: {
        email,
      },
    });
  }

  public async findAll() {
    return await this.driversRepository.find();
  }

  public async createAll(drivers: Driver[]) {
    return await this.driversRepository.save(drivers);
  }
}
