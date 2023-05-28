import * as bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export const CryptoUtil = {
  encode: (value: string): string => bcrypt.hashSync(value, SALT_ROUNDS),
  compare: (value: string, hash: string): boolean =>
    bcrypt.compareSync(value, hash),
};
