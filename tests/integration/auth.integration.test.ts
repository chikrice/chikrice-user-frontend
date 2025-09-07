import { setStorage } from 'src/hooks/use-local-storage';

import { createTestStore } from '../config/vitest.setup';

const store = createTestStore();

describe('Auth Integration tests', () => {
  describe('Bootstrap', () => {
    describe('Valid Access Token Scenarios', () => {
      it('should authenticate user with valid access token and roadmapId', async () => {
        setStorage('accessToken', {
          token: 'valid-access-token',
          expires: '2026-12-31T23:00:00',
        });

        const mockLoadUserJourney = vi.fn().mockResolvedValue(undefined);
        store.getState().loadUserJourney = mockLoadUserJourney;
        await store.getState().bootstrap();

        expect(store.getState().authenticated).toBe(true);
        expect(store.getState().user).toEqual({
          id: 'abc-123',
          firstName: 'John',
          lastName: 'Maverick',
          roadmapId: 'roadmap-123',
        });

        expect(store.getState().loadUserJourney).toHaveBeenCalledWith('roadmap-123');
      });

      it('should authenticate user with valid access token but no roadmapId', async () => {
        // Mock: valid access token in storage
        // Mock: /auth/me returns user without roadmapId
        // Assert: user authenticated, redirected to steps
      });
    });

    describe('Expired Access Token Scenarios', () => {
      it('should refresh token when access token is expired', async () => {
        // Mock: expired access token in storage
        // Mock: valid refresh token in storage
        // Mock: /auth/refresh-tokens succeeds
        // Mock: /auth/me returns user
        // Assert: new tokens applied, user authenticated
      });
    });

    // 5. user has valid refreshToken, roadmapId exists
    // 6. user has valid refreshToken, roadmapId undefined
    // 7. user has expired refreshToken
    // 8. user refreshToken is null or undefined
  });
});
