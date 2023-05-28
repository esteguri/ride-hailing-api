import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

const SALT_ROUNDS = 10;

export const CryptoUtil = {
  encode: (value: string): string => bcrypt.hashSync(value, SALT_ROUNDS),
  compare: (value: string, hash: string): boolean =>
    bcrypt.compareSync(value, hash),
  sha256: (value: string): string => {
    const hash = crypto.createHash('sha256');
    hash.update(value);
    return hash.digest('hex');
  },
};
