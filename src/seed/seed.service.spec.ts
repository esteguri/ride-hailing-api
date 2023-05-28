import { Test, TestingModule } from '@nestjs/testing';
import { SeedService } from './seed.service';
import { UsersService } from 'src/users/users.service';
import { DriversService } from 'src/drivers/drivers.service';
import { ParametersService } from 'src/parameters/parameters.service';

describe('SeedService', () => {
  let service: SeedService;
  const userServiceMock = {
    createAll: jest.fn(),
    findAll: jest.fn(),
  };

  const driversServiceMock = {
    createAll: jest.fn(),
    findAll: jest.fn(),
  };

  const parametersServiceMock = {
    createAll: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeedService,
        {
          provide: UsersService,
          useValue: userServiceMock,
        },
        {
          provide: DriversService,
          useValue: driversServiceMock,
        },
        {
          provide: ParametersService,
          useValue: parametersServiceMock,
        },
      ],
    }).compile();

    service = module.get<SeedService>(SeedService);
  });

  beforeEach(() => {
    userServiceMock.createAll.mockReset();
    driversServiceMock.createAll.mockReset();
    parametersServiceMock.createAll.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should execute seed', async () => {
    userServiceMock.findAll.mockReturnValue(Promise.resolve([]));
    driversServiceMock.findAll.mockReturnValue(Promise.resolve([]));
    parametersServiceMock.findAll.mockReturnValue(Promise.resolve([]));
    parametersServiceMock.createAll.mockReturnValue(Promise.resolve([]));
    driversServiceMock.createAll.mockReturnValue(Promise.resolve([]));
    userServiceMock.createAll.mockReturnValue(Promise.resolve([]));

    await service.execute();
    expect(userServiceMock.findAll).toHaveBeenCalled();
    expect(driversServiceMock.findAll).toHaveBeenCalled();
    expect(parametersServiceMock.findAll).toHaveBeenCalled();
    expect(userServiceMock.createAll).toHaveBeenCalled();
    expect(driversServiceMock.createAll).toHaveBeenCalled();
    expect(parametersServiceMock.createAll).toHaveBeenCalled();
  });

  it('should not execute seed', async () => {
    userServiceMock.findAll.mockReturnValue(Promise.resolve([{}]));
    driversServiceMock.findAll.mockReturnValue(Promise.resolve([{}]));
    parametersServiceMock.findAll.mockReturnValue(Promise.resolve([{}]));

    await service.execute();
    expect(userServiceMock.findAll).toHaveBeenCalled();
    expect(driversServiceMock.findAll).toHaveBeenCalled();
    expect(parametersServiceMock.findAll).toHaveBeenCalled();
    expect(userServiceMock.createAll).not.toHaveBeenCalled();
    expect(driversServiceMock.createAll).not.toHaveBeenCalled();
    expect(parametersServiceMock.createAll).not.toHaveBeenCalled();
  });
});
