import { isTokenExpired } from 'src/store/auth/helpers';

describe('Auth Helpers', () => {
  it('should return false for future date (token not expired)', () => {
    const futureDate = '2025-10-12T16:18:04.793Z';
    const result = isTokenExpired(futureDate);
    expect(result).toBe(false);
  });

  it('should return true for past date (token expired)', () => {
    const pastDate = '2020-05-12T16:18:04.793Z';
    const result = isTokenExpired(pastDate);
    expect(result).toBe(true);
  });

  it('should handle null correctly', () => {
    const result = isTokenExpired(null);
    expect(result).toBe(true);
  });
});
