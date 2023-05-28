import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<object>;
};

const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  find: jest.fn(),
  findBy: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findOne: jest.fn(),
  createQueryBuilder: jest.fn(),
}));

export const createQueryBuilderMock = (mock) => {
  const mockFunction = () => ({ ...createQueryBuilderMock(mock), ...mock });

  return {
    delete: mockFunction,
    from: mockFunction,
    innerJoinAndSelect: mockFunction,
    innerJoin: mockFunction,
    where: mockFunction,
    andWhere: mockFunction,
    ...mock,
  };
};

const providerMock = (entity) => ({
  provide: getRepositoryToken(entity),
  useFactory: repositoryMockFactory,
});

export const RepositoryMock = (entity) => ({
  provider: providerMock(entity),
  token: getRepositoryToken(entity),
  factory: repositoryMockFactory,
});
