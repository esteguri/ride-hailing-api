import { Test, TestingModule } from '@nestjs/testing';
import { DriversService } from './drivers.service';
import { Repository } from 'typeorm';
import { MockType, RepositoryMock } from 'src/common/types/repository.mock';
import { DriversSeed } from 'src/seed/data/drivers.seed';
import { Driver } from './entities/driver.entity';

describe('DriversService', () => {
  let service: DriversService;
  let repositoryMock: MockType<Repository<Driver>>;

  const driver: Driver = DriversSeed[0];

  beforeEach(async () => {
    const { provider, token } = RepositoryMock(Driver);

    const module: TestingModule = await Test.createTestingModule({
      providers: [provider, DriversService],
    }).compile();

    service = module.get<DriversService>(DriversService);
    repositoryMock = module.get(token);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a driver by id', async () => {
    repositoryMock.findOne.mockReturnValue(Promise.resolve(driver));
    const result = await service.findById('1');
    expect(result).toEqual(driver);
  });

  it('should find a driver by email', async () => {
    repositoryMock.findOne.mockReturnValue(Promise.resolve(driver));
    const result = await service.findByEmail(driver.email);
    expect(result).toEqual(driver);
  });

  it('should find all drivers', async () => {
    repositoryMock.find.mockReturnValue(Promise.resolve([driver]));
    const result = await service.findAll();
    expect(result).toEqual([driver]);
  });

  it('should create all drivers', async () => {
    repositoryMock.save.mockReturnValue(Promise.resolve([driver]));
    const result = await service.createAll([driver]);
    expect(result).toEqual([driver]);
  });
});
