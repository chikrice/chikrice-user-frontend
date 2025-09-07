import { StateCreator } from 'zustand';
import { enqueueSnackbar } from 'notistack';
import { UserClient } from 'chikrice-types';

import { paths } from 'src/routes/paths';
import { router } from 'src/routes/navigation';
import { api, endpoints } from 'src/utils/axios';

import {
  applyTokens,
  fetchUserByAccess,
  getStoredAccess,
  getStoredRefresh,
  isTokenExpired,
  resetUserInputs,
  setAuthHeader,
} from './helpers';

import type { Store, AuthState, UserInputs, AuthActions, Credentials, GoogleCredentials } from 'src/types';

// -------------------------------------
export const createAuthStore: StateCreator<Store, [], [], AuthState & AuthActions> = (set, get) => ({
  user: null,
  tokens: null,
  authError: null,
  isFirstLogin: true,
  isAuthLoading: false,
  method: 'jwt',
  authenticated: false,
  //
  bootstrap: async () => {
    set({ isAuthLoading: true, authError: null });
    try {
      const access = getStoredAccess();
      if (access && !isTokenExpired(access.expires)) {
        setAuthHeader(access.token);
        const user = await fetchUserByAccess(access.token);
        set({ user, authenticated: true });

        if (user?.roadmapId) {
          await get().loadUserJourney(user.roadmapId);
        } else {
          router.push(paths.steps.user);
        }
        return;
      }

      const refresh = getStoredRefresh();
      if (refresh && !isTokenExpired(refresh.expires)) {
        const { data: tokens } = await api.post(endpoints.auth.refreshTokens, {
          refreshToken: refresh.token,
        });
        applyTokens(tokens);
        const user = await fetchUserByAccess(tokens.access.token);
        if (user?.roadmapId) {
          await get().loadUserJourney(user.roadmapId);
        } else {
          router.push(paths.steps.user);
        }
        set({ user, tokens, authenticated: true });
        return;
      }

      set({ user: null, authenticated: false });
    } catch (error) {
      console.error('🔐 [AUTH] Bootstrap error:', error);
      set({ user: null, authenticated: false, authError: error });
    } finally {
      set({ isAuthLoading: false });
    }
  },
  //
  login: async (credentials: Credentials) => {
    try {
      const {
        data: { user, tokens },
      } = await api.post(endpoints.auth.login, credentials);
      applyTokens(tokens);
      set({ user, tokens, authenticated: true });
      resetUserInputs();

      if (user?.roadmapId) {
        await get().loadUserJourney(user.roadmapId);
        router.push(paths.dashboard);
      } else {
        router.push(paths.steps);
      }
    } catch ({ error }) {
      enqueueSnackbar(error?.message, { variant: 'error' });
    }
  },
  //
  register: async (credentials: Credentials, userInputs: UserInputs) => {
    try {
      const {
        data: { user, tokens },
      } = await api.post(endpoints.auth.register, { ...credentials, ...userInputs });
      applyTokens(tokens);
      set({ user, tokens, authenticated: true });

      await get().createUserJourney({ ...userInputs, userId: user.id });
      resetUserInputs();
      router.push(paths.progress);
    } catch (error) {
      enqueueSnackbar(error.message || 'Signup failed', { variant: 'error' });
    }
  },
  //
  googleAuth: async (credentials: GoogleCredentials) => {
    try {
      const {
        data: { user, tokens, isFirstLogin },
      } = await api.post(endpoints.auth.google, credentials);
      applyTokens(tokens);
      set({ user, tokens, isFirstLogin, authenticated: true });
      return user;
    } catch (error) {
      enqueueSnackbar(error.message || 'Authentication failed', { variant: 'error' });
    }
  },
  //
  logout: async () => {
    try {
      const { token: refreshToken } = getStoredRefresh();
      applyTokens(null);
      await api.post(endpoints.auth.logout, { refreshToken });
      set({ user: null, authenticated: false, tokens: null });
    } catch (error) {
      enqueueSnackbar(error.message || 'Logout error', { variant: 'error' });
    }
  },
  refreshUserInfo: async (id: string) => {
    try {
      const { data: user } = await api.get(endpoints.user.id(id));
      set({ user });
    } catch (error) {
      console.error(error);
    }
  },
  updateUser: async (userInputs: UserClient): Promise<void> => {
    const user = get().user;
    try {
      await api.patch(endpoints.user.id(user.id), { ...userInputs });
    } catch (error) {
      console.error(error);
    } finally {
      await get().refreshUserInfo(user.id);
    }
  },
});
