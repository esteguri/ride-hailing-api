import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

const executeSeed = async (app: INestApplication) => {
  await request(app.getHttpServer()).post('/seed').send();
};

const executeLogin = async (
  app: INestApplication,
  data: {
    username: string;
    password: string;
  },
) => {
  return request(app.getHttpServer()).post('/auth/login').send(data);
};

export const Execute = {
  seed: executeSeed,
  login: executeLogin,
};
