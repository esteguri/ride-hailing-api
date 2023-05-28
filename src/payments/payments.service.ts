import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { User } from 'src/users/entities/users.entity';
import axios, { AxiosInstance } from 'axios';
import { Payment } from './entities/payments.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventPaymentDto } from './dto/event-payment.dto';
import { CryptoUtil } from 'src/common';

@Injectable()
export class PaymentsService {
  private http: AxiosInstance;

  constructor(
    @InjectRepository(Payment)
    private readonly repositoryPayments: Repository<Payment>,
  ) {
    this.http = axios.create({
      baseURL: process.env.API_PAYMENT_URL,
      headers: {
        Authorization: 'Bearer ' + process.env.API_PAYMENT_KEY,
        'Content-Type': 'application/json',
      },
    });
  }

  async createEvent(event: EventPaymentDto) {
    this.validateSignature(event);
    this.repositoryPayments.save(event.data.transaction);
  }

  async validateSignature(event: EventPaymentDto) {
    try {
      const { id, amount_in_cents, status } = event.data.transaction;

      const signature =
        id +
        status +
        amount_in_cents +
        `${event.timestamp}` +
        process.env.API_PAYMENT_EVENTS_KEY;

      const result = CryptoUtil.sha256(signature) === event.signature.checksum;

      if (!result) throw new BadRequestException('Signature not valid');
    } catch (error) {
      throw new BadRequestException('Error validating signature');
    }
  }

  async createPayment(user: User, amount: number) {
    try {
      const response = await this.http.post('/transactions', {
        amount_in_cents: amount * 100,
        currency: 'COP',
        customer_email: user.email,
        payment_method: {
          installments: 1,
        },
        reference: new Date().getTime().toString(),
        payment_source_id: user.payment_token,
      });

      return response.data;
    } catch (error) {
      throw new InternalServerErrorException('Error creating payment');
    }
  }
}
