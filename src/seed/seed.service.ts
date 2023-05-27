import { Injectable } from '@nestjs/common';
import { DriversService } from 'src/drivers/drivers.service';
import { UsersService } from 'src/users/users.service';
import { DriversSeed } from './data/drivers.seed';
import { UsersSeed } from './data/users.seed';

@Injectable()
export class SeedService {
  constructor(
    private readonly driversService: DriversService,
    private readonly usersService: UsersService,
  ) {}

  public execute(): void {
    this.executeUsers();
    this.executeDrivers();
  }

  private async executeDrivers() {
    const drivers = await this.driversService.findAll();
    if (drivers.length === 0) {
      this.driversService.createAll(DriversSeed);
    }
  }

  private async executeUsers() {
    const drivers = await this.usersService.findAll();
    if (drivers.length === 0) {
      this.usersService.createAll(UsersSeed);
    }
  }
}
