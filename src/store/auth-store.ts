import { StateCreator } from 'zustand';
import { enqueueSnackbar } from 'notistack';

import { paths } from 'src/routes/paths';
import { router } from 'src/routes/navigation';
import { api, endpoints } from 'src/utils/axios';
import { isTokenExpired } from 'src/store/helpers';
import { userInputsInitialState } from 'src/sections/steps/user/user-inputs';
import { getStorage, setStorage, removeStorage } from 'src/hooks/use-local-storage';

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

const applyTokens = (tokens: Tokens) => {
  if (tokens) {
    setStorage('accessToken', tokens.access);
    setStorage('refreshToken', tokens.refresh);
    api.defaults.headers.common.Authorization = `Bearer ${tokens.access.token}`;
  } else {
    removeStorage('accessToken');
    removeStorage('refreshToken');
    delete api.defaults.headers.common.Authorization;
  }
};

const getStoredAccess = () => getStorage(ACCESS_TOKEN_KEY);
const getStoredRefresh = () => getStorage(REFRESH_TOKEN_KEY);

const fetchUserByAccess = async (accessToken: string) => {
  const {
    data: { user },
  } = await api.post(endpoints.auth.me, { accessToken });
  return user;
};

const setAuthHeader = (token: string) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
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
    console.log('🔐 [AUTH] Bootstrap started');
    set({ isAuthLoading: true, authError: null });
    try {
      const access = getStoredAccess();
      console.log('🔐 [AUTH] Access token check:', !!access);

      if (access && !isTokenExpired(access.expires)) {
        console.log(' [AUTH] Using valid access token');
        setAuthHeader(access.token);
        const user = await fetchUserByAccess(access.token);
        console.log('🔐 [AUTH] User fetched:', user?.id, 'RoadmapId:', user?.roadmapId);
        set({ user, authenticated: true });

        if (user?.roadmapId) {
          console.log('🔐 [AUTH] Loading user journey for roadmap:', user.roadmapId);
          await get().loadUserJourney(user.roadmapId);
          console.log('🔐 [AUTH] User journey loaded successfully');
        } else {
          console.log('🔐 [AUTH] No roadmapId found for user');
        }
        return;
      }

      const refresh = getStoredRefresh();
      console.log('🔐 [AUTH] Refresh token check:', !!refresh);

      if (refresh && !isTokenExpired(refresh.expires)) {
        console.log('🔐 [AUTH] Using refresh token');
        const { data: tokens } = await api.post(endpoints.auth.refreshTokens, {
          refreshToken: refresh.token,
        });
        applyTokens(tokens);
        const user = await fetchUserByAccess(tokens.access.token);
        console.log('🔐 [AUTH] User fetched via refresh:', user?.id);
        set({ user, tokens, authenticated: true });
        return;
      }

      console.log('🔐 [AUTH] No valid tokens found');
      set({ user: null, authenticated: false });
    } catch (error) {
      console.error('🔐 [AUTH] Bootstrap error:', error);
      set({ user: null, authenticated: false });
    } finally {
      console.log('🔐 [AUTH] Bootstrap completed');
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
        console.log('🔐 [AUTH] Loading user journey after login for roadmap:', user.roadmapId);
        await get().loadUserJourney(user.roadmapId);
        console.log('🔐 [AUTH] User journey loaded after login');
        router.push(paths.dashboard);
      } else {
        console.log('🔐 [AUTH] User has no roadmapId, skipping journey load');
        router.push(paths.steps.user);
      }
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
      const { data: user } = await api.get(endpoints.user.id(id));
      set({ user });
    } catch (error) {
      console.error(error);
    }
  },
});
