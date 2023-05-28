import { ParametersKey } from 'src/common';
import { Parameter } from 'src/parameters/entities/parameter.entity';
import { v4 as uuid } from 'uuid';

export const ParametersSeed: Parameter[] = [
  {
    id: uuid(),
    key: ParametersKey.PRICE_KM,
    value: '1000',
  },
  {
    id: uuid(),
    key: ParametersKey.PRICE_MINUTE,
    value: '200',
  },
  {
    id: uuid(),
    key: ParametersKey.PRICE_BASE,
    value: '3500',
  },
];
