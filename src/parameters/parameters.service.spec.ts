import { Test, TestingModule } from '@nestjs/testing';
import { ParametersService } from './parameters.service';
import { Parameter } from './entities/parameter.entity';
import { Repository } from 'typeorm';
import { MockType, RepositoryMock } from 'src/common/types/repository.mock';
import { ParametersSeed } from 'src/seed/data/parameters.seed';
import { ParametersKey } from 'src/common';

describe('ParametersService', () => {
  let service: ParametersService;
  let repositoryMock: MockType<Repository<Parameter>>;

  const parameter = ParametersSeed[0];

  beforeEach(async () => {
    const { provider, token } = RepositoryMock(Parameter);

    const module: TestingModule = await Test.createTestingModule({
      providers: [provider, ParametersService],
    }).compile();

    service = module.get<ParametersService>(ParametersService);
    repositoryMock = module.get(token);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a parameter by key', async () => {
    repositoryMock.findOne.mockReturnValue(Promise.resolve(parameter));
    const result = await service.get(ParametersKey.PRICE_KM);
    expect(result).toBe(parameter.value);
  });

  it('should generate a exception if parameter not found', () => {
    repositoryMock.findOne.mockReturnValue(Promise.resolve(undefined));
    expect(service.get(ParametersKey.PRICE_KM)).rejects.toThrow();
  });

  it('should find all parameters', async () => {
    repositoryMock.find.mockReturnValue(Promise.resolve(ParametersSeed));
    expect(await service.findAll()).toEqual(ParametersSeed);
  });

  it('should create all parameters', async () => {
    repositoryMock.save.mockReturnValue(Promise.resolve(ParametersSeed));
    expect(await service.createAll(ParametersSeed)).toEqual(ParametersSeed);
  });
});
