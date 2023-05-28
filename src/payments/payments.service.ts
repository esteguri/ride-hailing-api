import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/users/entities/users.entity';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class PaymentsService {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: process.env.API_PAYMENT_URL,
      headers: {
        Authorization: 'Bearer ' + process.env.API_PAYMENT_KEY,
        'Content-Type': 'application/json',
      },
    });
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
