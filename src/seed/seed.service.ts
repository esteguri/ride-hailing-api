import { Injectable } from '@nestjs/common';
import { DriversService } from 'src/drivers/drivers.service';
import { UsersService } from 'src/users/users.service';
import { DriversSeed } from './data/drivers.seed';
import { UsersSeed } from './data/users.seed';
import { ParametersService } from 'src/parameters/parameters.service';
import { ParametersSeed } from './data/parameters.seed';

@Injectable()
export class SeedService {
  constructor(
    private readonly driversService: DriversService,
    private readonly usersService: UsersService,
    private readonly parametersService: ParametersService,
  ) {}

  public execute(): void {
    this.executeUsers();
    this.executeDrivers();
    this.executeParameters();
  }

  private async executeDrivers() {
    const drivers = await this.driversService.findAll();
    if (drivers.length === 0) {
      this.driversService.createAll(DriversSeed);
    }
  }

  private async executeParameters() {
    const parameters = await this.parametersService.findAll();
    if (parameters.length === 0) {
      this.parametersService.createAll(ParametersSeed);
    }
  }

  private async executeUsers() {
    const users = await this.usersService.findAll();
    if (users.length === 0) {
      this.usersService.createAll(UsersSeed);
    }
  }
}
