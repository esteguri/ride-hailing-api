import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { UsersSeed } from 'src/seed/data/users.seed';
import * as request from 'supertest';
import { Execute } from './utils/execute.util';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await Execute.seed(app);
  });

  it('/login (POST) - unauthorized', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'john', password: 'fail-password' })
      .expect(401);
  });

  it('/login (POST) - login success', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: UsersSeed[0].email, password: '123456' })
      .expect(200);
  });
});
