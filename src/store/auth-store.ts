import { StateCreator } from 'zustand';
import { enqueueSnackbar } from 'notistack';

import { paths } from 'src/routes/paths';
import { router } from 'src/routes/navigation';
import { api, endpoints } from 'src/utils/axios';
import { getStorage, setStorage } from 'src/hooks/use-local-storage';
import { userInputsInitialState } from 'src/sections/steps/user/user-inputs';

import { handleTokensSession, isTokenExpired } from './helpers';

import type {
  Store,
  Tokens,
  AuthState,
  UserInputs,
  AuthActions,
  Credentials,
  GoogleCredentials,
} from 'src/types';

// -------------------------------------

const USER_INPUTS_KEY = 'user-inputs';
const COACH_INPUTS_KEY = 'coach-inputs';
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

// -------------------------------------

const resetUserInputs = () => {
  setStorage(USER_INPUTS_KEY, userInputsInitialState);
  setStorage(COACH_INPUTS_KEY, { experience: null, speciality: [] });
};

const setAuthHeader = (token: string) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

const applyTokens = (tokens: Tokens) => {
  handleTokensSession(tokens);
  setAuthHeader(tokens?.access?.token);
};

const getStoredAccess = () => getStorage(ACCESS_TOKEN_KEY);
const getStoredRefresh = () => getStorage(REFRESH_TOKEN_KEY);

const fetchUserByAccess = async (accessToken: string) => {
  const {
    data: { user },
  } = await api.post(endpoints.auth.me, { accessToken });
  return user;
};

// -------------------------------------
export const createAuthStore: StateCreator<Store, [], [], AuthState & AuthActions> = (set, get) => ({
  user: null,
  tokens: null,
  authError: null,
  isAuthLoading: false,
  isFirstLogin: true,
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
        set({ user, tokens, authenticated: true });
        return;
      }

      set({ user: null, authenticated: false });
    } catch {
      set({ user: null, authenticated: false });
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
      router.push(paths.dashboard);
    } catch (error) {
      enqueueSnackbar(error.message || 'login failed', { variant: 'error' });
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
  refreshTokens: async () => {
    const refresh = getStoredRefresh();
    if (!refresh || isTokenExpired(refresh.expires)) throw new Error('Refresh token expired');

    const { data: tokens } = await api.post(endpoints.auth.refreshTokens, {
      refreshToken: refresh.token,
    });
    applyTokens(tokens);
    return tokens;
  },
  //
  logout: async () => {
    try {
      const { token: refreshToken } = getStorage(REFRESH_TOKEN_KEY);
      applyTokens(null);
      await api.post(endpoints.auth.logout, { refreshToken });
      set({ user: null, authenticated: false, tokens: null });
    } catch (error) {
      enqueueSnackbar(error.message || 'Logout error', { variant: 'error' });
    }
  },

  refreshUserInfo: async (id: string) => {
    try {
      const {
        data: { user },
      } = await api.get(endpoints.user.get(id));
      set({ user });
    } catch (error) {
      console.error(error);
    }
  },
});
