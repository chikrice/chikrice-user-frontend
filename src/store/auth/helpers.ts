import { Token, Tokens } from 'src/types';
import { api, endpoints } from 'src/utils/axios';
import { userInputsInitialState } from 'src/sections/steps/user/user-inputs';
import { getStorage, removeStorage, setStorage } from 'src/hooks/use-local-storage';

// =====================================
// AUTH HELPERS
//=====================================

// -------------------------------------

const USER_INPUTS_KEY = 'user-inputs';
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

// -------------------------------------

export const resetUserInputs = () => {
  setStorage(USER_INPUTS_KEY, userInputsInitialState);
};

export const applyTokens = (tokens: Tokens) => {
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

export const getStoredAccess = () => getStorage(ACCESS_TOKEN_KEY);
export const getStoredRefresh = () => getStorage(REFRESH_TOKEN_KEY);

export const fetchUserByAccess = async (accessToken: string) => {
  const {
    data: { user },
  } = await api.post(endpoints.auth.me, { accessToken });
  return user;
};

export const setAuthHeader = (token: string) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export const isTokenExpired = (expires: string): boolean => {
  const expirationDate = new Date(expires);
  return expirationDate.getTime() < Date.now();
};

export const setAccessTokenSession = (token: Token | null) => {
  if (token) {
    setStorage(ACCESS_TOKEN_KEY, token);
    api.defaults.headers.common.Authorization = `Bearer ${token.token}`;
  } else {
    removeStorage(ACCESS_TOKEN_KEY);
    delete api.defaults.headers.common.Authorization;
  }
};

export const setRefreshTokenSession = (token: Token | null) => {
  if (token) {
    setStorage(REFRESH_TOKEN_KEY, token);
  } else {
    removeStorage(REFRESH_TOKEN_KEY);
  }
};

export const handleTokensSession = (tokens: Tokens) => {
  setAccessTokenSession(tokens?.access || null);
  setRefreshTokenSession(tokens?.refresh || null);
};
