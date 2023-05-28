import { CryptoUtil } from 'src/common';
import { User } from '../../users/entities/users.entity';
import { v4 as uuid } from 'uuid';

export const UsersSeed: User[] = [
  {
    id: uuid(),
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    payment_token: 62881,
    is_active: true,
    created_at: new Date(),
    password: CryptoUtil.encode('123456'),
  },
  {
    id: uuid(),
    name: 'Carlos Santana',
    email: 'carlos.santana@gmail.com',
    payment_token: 62881,
    is_active: true,
    created_at: new Date(),
    password: CryptoUtil.encode('123456'),
  },
];
