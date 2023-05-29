import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { DriversService } from 'src/drivers/drivers.service';
import { UsersService } from 'src/users/users.service';
import { DriversSeed } from 'src/seed/data/drivers.seed';
import { UsersSeed } from 'src/seed/data/users.seed';
import { CryptoUtil } from 'src/common';

describe('AuthService', () => {
  let service: AuthService;

  const jwtServiceMock = {
    sign: jest.fn(),
  };
  const driversServiceMock = {
    findByEmail: jest.fn(),
  };
  const usersServiceMock = {
    findByEmail: jest.fn(),
  };

  const driver = DriversSeed[0];
  const user = UsersSeed[0];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
        {
          provide: DriversService,
          useValue: driversServiceMock,
        },
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should login a driver', async () => {
    const spyCrypto = jest.spyOn(CryptoUtil, 'compare').mockReturnValue(true);

    driversServiceMock.findByEmail.mockReturnValue(Promise.resolve(driver));
    jwtServiceMock.sign.mockReturnValue('token');

    const result = await service.login(driver.email, driver.password);
    expect(result).toEqual({ token: 'token' });
    expect(spyCrypto).toBeCalled();
    spyCrypto.mockRestore();
  });

  it('should login a user', async () => {
    const spyCrypto = jest.spyOn(CryptoUtil, 'compare').mockReturnValue(true);

    usersServiceMock.findByEmail.mockReturnValue(Promise.resolve(user));
    jwtServiceMock.sign.mockReturnValue('token');

    const result = await service.login(user.email, user.password);
    expect(result).toEqual({ token: 'token' });
    expect(spyCrypto).toBeCalled();

    spyCrypto.mockRestore();
  });

  it('should throw an error when login fails', async () => {
    driversServiceMock.findByEmail.mockReturnValue(Promise.resolve(driver));
    usersServiceMock.findByEmail.mockReturnValue(Promise.resolve(user));

    expect(service.login(driver.email, driver.password)).rejects.toThrow();
  });
});
