import { paths } from 'src/routes/paths';
import { api, endpoints } from 'src/utils/axios';
import { getStorage, removeStorage, setStorage } from 'src/hooks/use-local-storage';

// -------------------------------------

// =====================================
// AUTH HELPERS
//=====================================

// Constants
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

/**
 * Check if a token is expired based on its expiration time.
 * @param {string} expires - Expiration date in string format
 * @returns {boolean}
 */
export const isTokenExpired = (expires) => {
  const expirationDate = new Date(expires);
  return expirationDate < Date.now();
};

/**
 * Set a timer to handle session expiration and refresh the token when necessary.
 * @param {string} expires - Expiration date of the token.
 */
export const handleSessionLife = (expires) => {
  const expirationDate = new Date(expires);
  const timeLeft = expirationDate - Date.now();

  if (timeLeft <= 0) {
    console.log('Token has already expired or the expiration date is invalid.');
    return;
  }

  clearTimeout(window.expiredTimer); // Store timer globally to avoid recreating the timer.

  window.expiredTimer = setTimeout(() => {
    getNewAccessTokenWithRefreshToken();
  }, timeLeft - 5000);
};

/**
 * Set access token in local storage and initialize session lifecycle.
 * @param {object|null} token - Access token object containing token string and expiration.
 */
export const setAccessTokenSession = (token) => {
  console.log(token);

  if (token) {
    setStorage(ACCESS_TOKEN_KEY, token);
    handleSessionLife(token.expires);
    api.defaults.headers.common.Authorization = `Bearer ${token.token}`;
  } else {
    removeStorage(ACCESS_TOKEN_KEY);
    delete api.defaults.headers.common.Authorization;
  }
};

/**
 * Set refresh token in local storage.
 * @param {object|null} token - Refresh token object containing token string and expiration.
 */
export const setRefreshTokenSession = (token) => {
  if (token) {
    setStorage(REFRESH_TOKEN_KEY, token);
  } else {
    removeStorage(REFRESH_TOKEN_KEY);
  }
};

/**
 * Handle storing both access and refresh tokens in local storage.
 * @param {object} tokens - Object containing both access and refresh tokens.
 */
export const handleTokensSession = (tokens) => {
  setAccessTokenSession(tokens?.access || null);
  setRefreshTokenSession(tokens?.refresh || null);
};

/**
 * Request new access token using refresh token.
 * If successful, updates tokens in local storage. Otherwise, redirects to login.
 */
export const getNewAccessTokenWithRefreshToken = async () => {
  try {
    const refreshToken = getStorage(REFRESH_TOKEN_KEY);

    if (!refreshToken || isTokenExpired(refreshToken.expires)) {
      throw new Error('Refresh token expired');
    }

    const response = await api.post(endpoints.auth.refreshTokens, {
      refreshToken: refreshToken.token,
    });

    const tokens = response.data;
    handleTokensSession(tokens);
  } catch (error) {
    console.log(error);
    alert('Your session has expired. Please log in again.');
    window.location.href = paths.auth.login;
  }
};

export function getCurrentTimeSlot() {
  const now = new Date();
  const hours = now.getHours();

  // Define time slots
  const timeSlots = [
    { start: 0, end: 6, slot: '00:00-06:00' },
    { start: 6, end: 9, slot: '06:00-09:00' },
    { start: 9, end: 12, slot: '09:00-12:00' },
    { start: 12, end: 15, slot: '12:00-15:00' },
    { start: 15, end: 18, slot: '15:00-18:00' },
    { start: 18, end: 20, slot: '18:00-21:00' },
    { start: 21, end: 0, slot: '21:00-24:00' },
  ];

  for (const { start, end, slot } of timeSlots) {
    if (hours >= start && hours < end) {
      return slot;
    }
  }

  return null;
}
