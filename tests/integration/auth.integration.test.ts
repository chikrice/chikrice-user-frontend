import { router } from 'src/routes/navigation';
import { getStorage, setStorage } from 'src/hooks/use-local-storage';
import { userInputsInitialState } from 'src/sections/steps/user/user-inputs';

import { createTestStore } from '../config/vitest.setup';

// -------------------------------------

const store = createTestStore();

describe('Auth Integration tests', () => {
  let mockLoadUserJourney: any;
  let mockCreateUserJourney: any;

  beforeEach(() => {
    localStorage.clear();

    vi.mocked(router.push).mockClear();

    store.setState({
      user: null,
      tokens: null,
      authError: null,
      isFirstLogin: true,
      isAuthLoading: false,
      method: 'jwt',
      authenticated: false,
    });

    mockLoadUserJourney = vi.fn().mockResolvedValue(undefined);
    mockCreateUserJourney = vi.fn().mockResolvedValue(undefined);

    store.getState().loadUserJourney = mockLoadUserJourney;
    store.getState().createUserJourney = mockCreateUserJourney;
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

  describe('Register', () => {
    it('should register user successfully and store tokens with valid input', async () => {
      const mockCredentials = {
        email: 'khaled@gmail.com',
        password: 'password1',
      };

      const mockUserInputs = {
        height: 180,
        age: 27,
        startWeight: 75,
        currentWeight: 75,
        gender: 'male' as const,
        activityLevel: 3 as const,
        isWeightLifting: false,
        targetWeight: 70,
        goalAchievementSpeed: 'recommended' as const,
      };

      await store.getState().register(mockCredentials, mockUserInputs);

      const accessToken = getStorage('accessToken');
      const refreshToken = getStorage('refreshToken');

      expect(accessToken).toEqual({
        token: 'new-access-token',
        expires: '2025-12-31T23:00:00',
      });
      expect(refreshToken).toEqual({
        token: 'new-refresh-token',
        expires: '2026-12-31T23:00:00',
      });

      expect(mockCreateUserJourney).toHaveBeenCalledWith({
        ...mockUserInputs,
        userId: 'new-user-123',
      });

      const userInputs = getStorage('user-inputs');
      expect(userInputs).toEqual(userInputsInitialState);

      expect(vi.mocked(router.push)).toHaveBeenCalledWith('/progress');

      expect(store.getState().authenticated).toBe(true);
      expect(store.getState().user).toEqual({
        id: 'new-user-123',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'khaled@gmail.com',
        roadmapId: null,
      });
    });

    it('should handle registration error and show error message', async () => {
      const mockCredentials = {
        email: 'error@test.com',
        password: 'password123',
      };

      const mockUserInputs = {
        height: 180,
        age: 27,
        startWeight: 75,
        currentWeight: 75,
        gender: 'male' as const,
        activityLevel: 3 as const,
        isWeightLifting: false,
        targetWeight: 70,
        goalAchievementSpeed: 'recommended' as const,
      };

      await store.getState().register(mockCredentials, mockUserInputs);

      const accessToken = getStorage('accessToken');
      const refreshToken = getStorage('refreshToken');

      expect(accessToken).toBeNull();
      expect(refreshToken).toBeNull();

      expect(store.getState().authenticated).toBe(false);
      expect(store.getState().user).toBeNull();

      expect(mockCreateUserJourney).not.toHaveBeenCalled();

      expect(vi.mocked(router.push)).not.toHaveBeenCalled();
    });
  });

  describe('Login', () => {
    it('should login user successfully with roadmap and redirect to dashboard', async () => {
      const mockCredentials = {
        email: 'user@example.com',
        password: 'password123',
      };

      await store.getState().login(mockCredentials);

      const accessToken = getStorage('accessToken');
      const refreshToken = getStorage('refreshToken');

      expect(accessToken).toEqual({
        token: 'login-access-token',
        expires: '2025-12-31T23:00:00',
      });
      expect(refreshToken).toEqual({
        token: 'login-refresh-token',
        expires: '2026-12-31T23:00:00',
      });

      expect(store.getState().authenticated).toBe(true);
      expect(store.getState().user).toEqual({
        id: 'user-123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'user@example.com',
        roadmapId: 'roadmap-123',
      });

      expect(mockLoadUserJourney).toHaveBeenCalledWith('roadmap-123');

      expect(vi.mocked(router.push)).toHaveBeenCalledWith('/dashboard');
    });

    it('should login user successfully without roadmap and redirect to steps', async () => {
      const mockCredentials = {
        email: 'user-no-roadmap@example.com',
        password: 'password123',
      };

      await store.getState().login(mockCredentials);

      const accessToken = getStorage('accessToken');
      const refreshToken = getStorage('refreshToken');

      expect(accessToken).toEqual({
        token: 'login-access-token-no-roadmap',
        expires: '2025-12-31T23:00:00',
      });
      expect(refreshToken).toEqual({
        token: 'login-refresh-token-no-roadmap',
        expires: '2026-12-31T23:00:00',
      });

      expect(store.getState().authenticated).toBe(true);
      expect(store.getState().user).toEqual({
        id: 'user-456',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'user-no-roadmap@example.com',
        roadmapId: null,
      });

      expect(mockLoadUserJourney).not.toHaveBeenCalled();

      expect(vi.mocked(router.push)).toHaveBeenCalledWith('/steps?role=user');
    });

    it('should handle login error with invalid credentials', async () => {
      const mockCredentials = {
        email: 'invalid@example.com',
        password: 'wrongpassword',
      };

      await store.getState().login(mockCredentials);

      const accessToken = getStorage('accessToken');
      const refreshToken = getStorage('refreshToken');

      expect(accessToken).toBeNull();
      expect(refreshToken).toBeNull();

      expect(store.getState().authenticated).toBe(false);
      expect(store.getState().user).toBeNull();

      expect(mockLoadUserJourney).not.toHaveBeenCalled();

      expect(vi.mocked(router.push)).not.toHaveBeenCalled();
    });
  });
});
