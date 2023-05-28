import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { Public } from 'src/auth/guards/auth.guard';
import { TransactionPaymentDto } from './dto/transaction-payment.dto';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Public()
  @HttpCode(200)
  @Post('event')
  public eventReceived(
    @Body() body: { data: { transaction: TransactionPaymentDto } },
  ) {
    this.paymentsService.createEvent(body.data.transaction);
    return { message: 'Event received' };
  }
}
