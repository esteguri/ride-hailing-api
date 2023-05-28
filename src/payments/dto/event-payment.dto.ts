import { TransactionPaymentDto } from './transaction-payment.dto';

export interface EventPaymentDto {
  event: string;
  data: {
    transaction: TransactionPaymentDto;
  };
  signature: {
    checksum: string;
  };
  timestamp: number;
}
