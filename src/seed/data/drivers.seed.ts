import { CryptoUtil } from 'src/common';
import { Driver } from 'src/drivers/entities/driver.entity';
import { v4 as uuid } from 'uuid';

export const DriversSeed: Driver[] = [
  {
    id: uuid(),
    name: 'Camilo Mejia',
    email: 'camilo.mejia@gmail.com',
    license_plate: 'ABC123',
    is_active: true,
    created_at: new Date(),
    password: CryptoUtil.encode('123456'),
  },
  {
    id: uuid(),
    name: 'Laura Santana',
    email: 'laura.santana@gmail.com',
    license_plate: 'DEF456',
    is_active: true,
    created_at: new Date(),
    password: CryptoUtil.encode('123456'),
  },
];
