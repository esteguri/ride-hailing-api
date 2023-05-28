import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payments')
export class Payment {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ type: 'varchar' })
  reference: string;

  @Column({ type: 'varchar' })
  created_at: string;

  @Column({ type: 'varchar' })
  finalized_at: string;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'varchar' })
  customer_email: string;

  @Column({ type: 'float' })
  amount_in_cents: number;
}
