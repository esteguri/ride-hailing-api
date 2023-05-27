import { RideStatus } from 'src/common';
import { Driver } from 'src/drivers/entities/driver.entity';
import { User } from 'src/users/entities/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';

@Entity('rides')
export class Ride {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @ManyToOne(() => Driver)
  @JoinColumn({ name: 'id_driver' })
  driver: Driver;

  @Column({
    type: 'enum',
    enum: RideStatus,
    default: RideStatus.started,
  })
  status: RideStatus;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  start_date: Date;

  @Column({ type: 'timestamp' })
  end_date: Date;

  @Column({ type: 'money' })
  price: number;

  @Column({ type: 'float' })
  start_latitude: number;

  @Column({ type: 'float' })
  start_longitude: number;

  @Column({ type: 'float' })
  end_latitude: number;

  @Column({ type: 'float' })
  end_longitude: number;
}
