import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

const executeSeed = async (app: INestApplication) => {
  await request(app.getHttpServer()).post('/seed').send();
};

export const Execute = {
  seed: executeSeed,
};
