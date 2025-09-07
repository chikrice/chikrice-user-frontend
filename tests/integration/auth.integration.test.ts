import { router } from 'src/routes/navigation';
import { setStorage } from 'src/hooks/use-local-storage';

import { createTestStore } from '../config/vitest.setup';

// -------------------------------------

const store = createTestStore();

describe('Auth Integration tests', () => {
  let mockLoadUserJourney: any;

  beforeEach(() => {
    mockLoadUserJourney = vi.fn().mockResolvedValue(undefined);
    store.getState().loadUserJourney = mockLoadUserJourney;
  });

  describe('Bootstrap', () => {
    describe('Valid Access Token Scenarios', () => {
      it('should authenticate user with valid access token and roadmapId', async () => {
        setStorage('accessToken', {
          token: 'valid-access-token',
          expires: '2026-12-31T23:00:00',
        });

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

      it('should authenticate user with valid access token, and redirect to steps for null reoamdapID', async () => {
        setStorage('accessToken', {
          token: 'valid-access-token-no-roadmap',
          expires: '2026-12-31T23:00:00',
        });
        await store.getState().bootstrap();

        expect(store.getState().authenticated).toBe(true);
        expect(store.getState().user).toEqual({
          id: 'abc-123',
          firstName: 'John',
          lastName: 'Maverick',
          roadmapId: null,
        });

        expect(vi.mocked(router.push)).toHaveBeenCalledWith('/steps?role=user');
      });
    });

    describe('Expired Access Token Scenarios', () => {
      it('should refresh token when access token is expired', async () => {
        setStorage('accessToken', {
          token: 'valid-access-token',
          expires: '2024-12-31T23:00:00',
        });
        setStorage('refreshToken', {
          token: 'valid-refresh-token',
          expires: '2025-12-31T23:00:00',
        });

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

      it('should authenticate user with valid refresh token, and redirect to steps for null reoamdapID', async () => {
        setStorage('accessToken', {
          token: 'valid-access-token-no-roadmap',
          expires: '2024-12-31T23:00:00',
        });
        setStorage('refreshToken', {
          token: 'valid-refresh-token-no-roadmap',
          expires: '2026-12-31T23:00:00',
        });
        await store.getState().bootstrap();

        expect(store.getState().authenticated).toBe(true);
        expect(store.getState().user).toEqual({
          id: 'abc-123',
          firstName: 'John',
          lastName: 'Maverick',
          roadmapId: null,
        });

        expect(vi.mocked(router.push)).toHaveBeenCalledWith('/steps?role=user');
      });

      it('should fail authentication when refresh token is expired', async () => {
        setStorage('accessToken', {
          token: 'expired-access-token',
          expires: '2020-01-01T00:00:00Z',
        });
        setStorage('refreshToken', {
          token: 'expired-refresh-token',
          expires: '2020-01-01T00:00:00Z',
        });

        await store.getState().bootstrap();

        expect(store.getState().authenticated).toBe(false);
        expect(store.getState().user).toBeNull();
        expect(mockLoadUserJourney).not.toHaveBeenCalled();
      });

      it('should fail authentication when refresh token is null', async () => {
        setStorage('accessToken', {
          token: 'expired-access-token',
          expires: '2020-01-01T00:00:00Z',
        });
        // Don't set refresh token (it will be null)

        await store.getState().bootstrap();

        expect(store.getState().authenticated).toBe(false);
        expect(store.getState().user).toBeNull();
        expect(mockLoadUserJourney).not.toHaveBeenCalled();
      });
    });
  });
});
