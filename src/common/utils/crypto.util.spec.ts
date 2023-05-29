import { CryptoUtil } from './crypto.util';

describe('CryptoUtil', () => {
  it('should encode a value', () => {
    const value = 'test';
    const encoded = CryptoUtil.encode(value);
    expect(encoded).toBeDefined();
    expect(encoded).not.toEqual(value);
  });

  it('should compare a value with a hash', () => {
    const value = 'test';
    const encoded = CryptoUtil.encode(value);
    const result = CryptoUtil.compare(value, encoded);
    expect(result).toBeTruthy();
  });

  it('should hash a value to sha256', () => {
    const value = 'test';
    const hash = CryptoUtil.sha256(value);
    expect(hash).toBeDefined();
    expect(hash).not.toEqual(value);
  });
});
