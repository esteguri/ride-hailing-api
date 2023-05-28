import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CryptoUtil } from 'src/common';
import { DriversService } from 'src/drivers/drivers.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly driversService: DriversService,
    private readonly usersService: UsersService,
  ) {}

  async login(username: string, password: string) {
    try {
      let id: string;
      const driver = await this.driversService.findByEmail(username);
      if (driver && CryptoUtil.compare(password, driver.password)) {
        id = driver.id;
      }

      const user = await this.usersService.findByEmail(username);
      if (user && CryptoUtil.compare(password, user.password)) {
        id = user.id;
      }

      if (!id) throw new UnauthorizedException();

      return {
        token: this.jwtService.sign({ id }),
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
