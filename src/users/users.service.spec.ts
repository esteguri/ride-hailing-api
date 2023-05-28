import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { MockType, RepositoryMock } from 'src/common/types/repository.mock';
import { UsersSeed } from 'src/seed/data/users.seed';

describe('UsersService', () => {
  let service: UsersService;
  let repositoryMock: MockType<Repository<User>>;

  const user: User = UsersSeed[0];

  beforeEach(async () => {
    const { provider, token } = RepositoryMock(User);

    const module: TestingModule = await Test.createTestingModule({
      providers: [provider, UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repositoryMock = module.get(token);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a user by id', async () => {
    repositoryMock.findOne.mockReturnValue(Promise.resolve(user));
    const result = await service.findById('1');
    expect(result).toEqual(user);
  });

  it('should find a user by email', async () => {
    repositoryMock.findOne.mockReturnValue(Promise.resolve(user));
    const result = await service.findByEmail(user.email);
    expect(result).toEqual(user);
  });

  it('should find all users', async () => {
    repositoryMock.find.mockReturnValue(Promise.resolve([user]));
    const result = await service.findAll();
    expect(result).toEqual([user]);
  });

  it('should create all users', async () => {
    repositoryMock.save.mockReturnValue(Promise.resolve([user]));
    const result = await service.createAll([user]);
    expect(result).toEqual([user]);
  });
});
