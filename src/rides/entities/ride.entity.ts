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

  @ManyToOne(() => User, { eager: true, nullable: false })
  @JoinColumn({ name: 'id_user' })
  user: User;

  @ManyToOne(() => Driver, { eager: true, nullable: false })
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

  @Column({ type: 'timestamp', nullable: true })
  end_date: Date;

  @Column({ type: 'money', nullable: true })
  price: number;

  @Column({ type: 'float' })
  start_latitude: number;

  @Column({ type: 'float' })
  start_longitude: number;

  @Column({ type: 'float', nullable: true })
  end_latitude: number;

  @Column({ type: 'float', nullable: true })
  end_longitude: number;
}
