export class TransactionPaymentDto {
  id: string;
  reference: string;
  created_at: string;
  finalized_at: string;
  status: string;
  customer_email: string;
  amount_in_cents: number;
}
