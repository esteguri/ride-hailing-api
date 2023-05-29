import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service';
import { Payment } from './entities/payments.entity';
import { Repository } from 'typeorm';
import { MockType, RepositoryMock } from 'src/common/types/repository.mock';
import { EventPaymentDto } from './dto/event-payment.dto';
import { CryptoUtil } from 'src/common';
import { UsersSeed } from 'src/seed/data/users.seed';
import axios from 'axios';

jest.mock('axios');

describe('PaymentsService', () => {
  let service: PaymentsService;
  let repositoryMock: MockType<Repository<Payment>>;
  let response = {
    data: {
      reference: '123',
    },
  };
  beforeEach(async () => {
    (axios.create as jest.Mock).mockReturnValue({
      post: jest.fn().mockResolvedValue(response),
    });

    const { provider, token } = RepositoryMock(Payment);

    const module: TestingModule = await Test.createTestingModule({
      providers: [provider, PaymentsService],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
    repositoryMock = module.get(token);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('CreateEvent', () => {
    const event: EventPaymentDto = {
      data: {
        transaction: {
          id: '1',
          amount_in_cents: 1000,
          status: 'paid',
          created_at: new Date().toDateString(),
          customer_email: '',
          finalized_at: new Date().toDateString(),
          reference: '123',
        },
      },
      signature: {
        checksum: 'checksum',
      },
      event: 'transaction.created',
      timestamp: 1618225200,
    };

    it("shouldn't register payment if signature is invalid", async () => {
      expect(service.createEvent(event)).rejects.toThrow('Signature not valid');
    });

    it('should register payment if signature is valid', async () => {
      const crytoSpy = jest
        .spyOn(CryptoUtil, 'sha256')
        .mockReturnValue('checksum');
      repositoryMock.save.mockReturnValue(Promise.resolve());

      expect(service.createEvent(event)).resolves.not.toThrow();
      expect(crytoSpy).toBeCalled();
    });
  });

  describe('CreatePayment', () => {
    const user = UsersSeed[0];
    const amount = 3000;

    it('should create a payment', async () => {
      const result = await service.createPayment(user, amount);
      expect(result.reference).toBe(response.data.reference);
    });
  });
});
