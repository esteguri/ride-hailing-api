import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';
import { Execute } from './utils/execute.util';
import { EventPaymentDto } from 'src/payments/dto/event-payment.dto';
import { PaymentsService } from 'src/payments/payments.service';

describe('PaymentsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PaymentsService)
      .useValue({
        createEvent: () => {},
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await Execute.seed(app);
  });

  const event: EventPaymentDto = {
    data: {
      transaction: {
        id: '153169-1685287925-89260',
        status: 'APPROVED',
        reference: '1685287924862',
        amount_in_cents: 1629000,
        created_at: new Date().toDateString(),
        customer_email: '',
        finalized_at: new Date().toDateString(),
      },
    },
    signature: {
      checksum:
        'a7816666658d03636e65ba66e60686d42a44ed7289591b08e073d9208bddd1b2',
    },
    event: 'transaction.updated',
    timestamp: 1685289731,
  };

  it('/event (POST) payment created', () => {
    return request(app.getHttpServer())
      .post('/payments/event')
      .send(event)
      .expect(200);
  });
});
