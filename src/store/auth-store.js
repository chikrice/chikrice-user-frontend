import { enqueueSnackbar } from 'notistack';

import { paths } from 'src/routes/paths';
import { router } from 'src/routes/navigation';
import axios, { endpoints } from 'src/utils/axios';
import { getStorage, setStorage } from 'src/hooks/use-local-storage';
import { userInputsInitialState } from 'src/sections/steps/user/user-inputs';

import { handleTokensSession, isTokenExpired } from './helpers';

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

const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

const applyTokens = (tokens) => {
  handleTokensSession(tokens);
  setAuthHeader(tokens?.access?.token);
};

const getStoredAccess = () => getStorage(ACCESS_TOKEN_KEY);
const getStoredRefresh = () => getStorage(REFRESH_TOKEN_KEY);

const fetchUserByAccess = async (accessToken) => {
  const {
    data: { user },
  } = await axios.post(endpoints.auth.me, { accessToken });
  return user;
};

// -------------------------------------
export const createAuthStore = (set, get) => ({
  user: null,
  tokens: null,
  error: null,
  isLoading: false,
  method: 'jwt',
  authenticated: false,
  //
  bootstrap: async () => {
    set({ isLoading: true, error: null });
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
        const { data: tokens } = await axios.post(endpoints.auth.refreshTokens, {
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
      set({ isLoading: false });
    }
  },
  //
  login: async (credentials) => {
    try {
      const {
        data: { user, tokens },
      } = await axios.post(endpoints.auth.login, credentials);
      applyTokens(tokens);
      set({ user, tokens, authenticated: true });
      resetUserInputs();
      router.push(paths.dashboard);
    } catch (error) {
      enqueueSnackbar(error.message || 'login failed', { variant: 'error' });
    }
  },
  //
  register: async (credentials, userInputs) => {
    try {
      const {
        data: { user, tokens },
      } = await axios.post(endpoints.auth.register, { ...credentials, ...userInputs });
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
  googleAuth: async (data) => {
    try {
      const {
        data: { user, tokens, isFirstLogin },
      } = await axios.post(endpoints.auth.google, data);
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

    const { data: tokens } = await axios.post(endpoints.auth.refreshTokens, {
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
      await axios.post(endpoints.auth.logout, { refreshToken });
      set({ user: null, authenticated: false, tokens: null });
    } catch (error) {
      enqueueSnackbar(error.message || 'Logout error', { variant: 'error' });
    }
  },

  refreshUserInfo: async (id) => {
    try {
      const {
        data: { user },
      } = await axios.get(endpoints.user.get(id));
      set({ user });
    } catch (error) {
      console.error(error);
    }
  },
});
