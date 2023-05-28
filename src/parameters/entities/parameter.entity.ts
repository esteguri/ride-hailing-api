import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('parameters')
export class Parameter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  key: string;

  @Column({ type: 'varchar', nullable: false })
  value: string;
}
