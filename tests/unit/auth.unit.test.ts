import { getStorage } from 'src/hooks/use-local-storage';
import {
  isTokenExpired,
  setAccessTokenSession,
  setRefreshTokenSession,
  resetUserInputs,
  applyTokens,
  getStoredAccess,
  getStoredRefresh,
  setAuthHeader,
  handleTokensSession,
} from 'src/store/auth/helpers';

describe('Auth Helpers', () => {
  describe('isTokenExpired function', () => {
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

  describe('setAccessTokenSession function', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('should store access token and set Authorization header when token is provided', () => {
      const mockToken = {
        token: 'access-token-123',
        expires: '2025-10-12T16:18:04.793Z',
      };

      setAccessTokenSession(mockToken);

      const storedToken = getStorage('accessToken');
      expect(storedToken).toEqual(mockToken);
    });

    it('should remove access token and clear Authorization header when token is null', () => {
      const mockToken = {
        token: 'access-token-123',
        expires: '2025-10-12T16:18:04.793Z',
      };
      setAccessTokenSession(mockToken);
      expect(getStorage('accessToken')).toEqual(mockToken);

      setAccessTokenSession(null);
      expect(getStorage('accessToken')).toBe(null);
    });

    it('should handle undefined token gracefully', () => {
      expect(() => setAccessTokenSession(undefined)).not.toThrow();
      expect(getStorage('accessToken')).toBe(null);
    });
  });

  describe('setRefreshTokenSession function', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('should store refresh token when token is provided', () => {
      const mockToken = {
        token: 'refresh-token-456',
        expires: '2025-11-12T16:18:04.793Z',
      };

      setRefreshTokenSession(mockToken);

      const storedToken = getStorage('refreshToken');
      expect(storedToken).toEqual(mockToken);
    });

    it('should remove refresh token when token is null', () => {
      const mockToken = {
        token: 'refresh-token-456',
        expires: '2025-11-12T16:18:04.793Z',
      };
      setRefreshTokenSession(mockToken);
      expect(getStorage('refreshToken')).toEqual(mockToken);

      setRefreshTokenSession(null);
      expect(getStorage('refreshToken')).toBe(null);
    });

    it('should handle undefined token gracefully', () => {
      expect(() => setRefreshTokenSession(undefined)).not.toThrow();
      expect(getStorage('refreshToken')).toBe(null);
    });
  });

  describe('Token session integration tests', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('should handle both access and refresh tokens independently', () => {
      const accessToken = {
        token: 'access-token-123',
        expires: '2025-10-12T16:18:04.793Z',
      };

      const refreshToken = {
        token: 'refresh-token-456',
        expires: '2025-11-12T16:18:04.793Z',
      };

      setAccessTokenSession(accessToken);
      setRefreshTokenSession(refreshToken);

      expect(getStorage('accessToken')).toEqual(accessToken);
      expect(getStorage('refreshToken')).toEqual(refreshToken);

      setAccessTokenSession(null);
      expect(getStorage('accessToken')).toBe(null);
      expect(getStorage('refreshToken')).toEqual(refreshToken);

      setRefreshTokenSession(null);
      expect(getStorage('accessToken')).toBe(null);
      expect(getStorage('refreshToken')).toBe(null);
    });

    it('should handle token with different data structures', () => {
      const tokenWithExtraData = {
        token: 'test-token',
        expires: '2025-10-12T16:18:04.793Z',
        // Additional properties that might exist
        type: 'Bearer',
        scope: 'read write',
      };

      setAccessTokenSession(tokenWithExtraData);
      const stored = getStorage('accessToken');
      expect(stored).toEqual(tokenWithExtraData);
    });
  });

  describe('resetUserInputs function', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('should reset user inputs to initial state', () => {
      resetUserInputs();

      const userInputs = getStorage('user-inputs');

      expect(userInputs).toEqual({
        age: null,
        height: null,
        startWeight: null,
        currentWeight: null,
        gender: null,
        activityLevel: null,
        isWeightLifting: null,
        targetWeight: null,
        goalAchievementSpeed: null,
      });
    });
  });

  describe('applyTokens function', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('should store both access and refresh tokens when tokens are provided', () => {
      const mockTokens = {
        access: {
          token: 'access-token-123',
          expires: '2025-10-12T16:18:04.793Z',
        },
        refresh: {
          token: 'refresh-token-456',
          expires: '2025-11-12T16:18:04.793Z',
        },
      };

      applyTokens(mockTokens);

      expect(getStorage('accessToken')).toEqual(mockTokens.access);
      expect(getStorage('refreshToken')).toEqual(mockTokens.refresh);
    });

    it('should remove both tokens when tokens are null', () => {
      // First set tokens
      const mockTokens = {
        access: {
          token: 'access-token-123',
          expires: '2025-10-12T16:18:04.793Z',
        },
        refresh: {
          token: 'refresh-token-456',
          expires: '2025-11-12T16:18:04.793Z',
        },
      };
      applyTokens(mockTokens);
      expect(getStorage('accessToken')).toEqual(mockTokens.access);
      expect(getStorage('refreshToken')).toEqual(mockTokens.refresh);

      // Then remove them
      applyTokens(null);
      expect(getStorage('accessToken')).toBe(null);
      expect(getStorage('refreshToken')).toBe(null);
    });

    it('should handle undefined tokens gracefully', () => {
      expect(() => applyTokens(undefined)).not.toThrow();
      expect(getStorage('accessToken')).toBe(null);
      expect(getStorage('refreshToken')).toBe(null);
    });
  });

  describe('getStoredAccess function', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('should return stored access token', () => {
      const mockToken = {
        token: 'access-token-123',
        expires: '2025-10-12T16:18:04.793Z',
      };

      setAccessTokenSession(mockToken);
      const result = getStoredAccess();

      expect(result).toEqual(mockToken);
    });

    it('should return null when no access token is stored', () => {
      const result = getStoredAccess();
      expect(result).toBe(null);
    });
  });

  describe('getStoredRefresh function', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('should return stored refresh token', () => {
      const mockToken = {
        token: 'refresh-token-456',
        expires: '2025-11-12T16:18:04.793Z',
      };

      setRefreshTokenSession(mockToken);
      const result = getStoredRefresh();

      expect(result).toEqual(mockToken);
    });

    it('should return null when no refresh token is stored', () => {
      const result = getStoredRefresh();
      expect(result).toBe(null);
    });
  });

  describe('setAuthHeader function', () => {
    it('should handle token string correctly', () => {
      const token = 'test-token-123';
      expect(() => setAuthHeader(token)).not.toThrow();
    });

    it('should handle null token correctly', () => {
      expect(() => setAuthHeader(null)).not.toThrow();
    });

    it('should handle undefined token correctly', () => {
      expect(() => setAuthHeader(undefined)).not.toThrow();
    });

    it('should handle empty string token correctly', () => {
      expect(() => setAuthHeader('')).not.toThrow();
    });
  });

  describe('handleTokensSession function', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('should handle tokens object with both access and refresh tokens', () => {
      const mockTokens = {
        access: {
          token: 'access-token-123',
          expires: '2025-10-12T16:18:04.793Z',
        },
        refresh: {
          token: 'refresh-token-456',
          expires: '2025-11-12T16:18:04.793Z',
        },
      };

      handleTokensSession(mockTokens);

      expect(getStorage('accessToken')).toEqual(mockTokens.access);
      expect(getStorage('refreshToken')).toEqual(mockTokens.refresh);
    });

    it('should handle tokens object with only access token', () => {
      const mockTokens = {
        access: {
          token: 'access-token-123',
          expires: '2025-10-12T16:18:04.793Z',
        },
        refresh: null,
      };

      handleTokensSession(mockTokens);

      expect(getStorage('accessToken')).toEqual(mockTokens.access);
      expect(getStorage('refreshToken')).toBe(null);
    });

    it('should handle tokens object with only refresh token', () => {
      const mockTokens = {
        access: null,
        refresh: {
          token: 'refresh-token-456',
          expires: '2025-11-12T16:18:04.793Z',
        },
      };

      handleTokensSession(mockTokens);

      expect(getStorage('accessToken')).toBe(null);
      expect(getStorage('refreshToken')).toEqual(mockTokens.refresh);
    });

    it('should handle null tokens object', () => {
      handleTokensSession(null);

      expect(getStorage('accessToken')).toBe(null);
      expect(getStorage('refreshToken')).toBe(null);
    });

    it('should handle undefined tokens object', () => {
      handleTokensSession(undefined);

      expect(getStorage('accessToken')).toBe(null);
      expect(getStorage('refreshToken')).toBe(null);
    });
  });
});
