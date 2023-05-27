import { Driver } from 'src/drivers/entities/driver.entity';
import { v4 as uuid } from 'uuid';

export const DriversSeed: Driver[] = [
  {
    id: uuid(),
    name: 'Camilo Mejia',
    license_plate: 'ABC123',
    latitude: 4.667,
    longitude: -74.056,
    is_active: true,
    created_at: new Date(),
  },
  {
    id: uuid(),
    name: 'Laura Santana',
    license_plate: 'DEF456',
    latitude: 4.677,
    longitude: -74.016,
    is_active: true,
    created_at: new Date(),
  },
];
