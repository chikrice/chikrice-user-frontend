import { isWithinInterval, isSameDay, parseISO } from 'date-fns';

import { paths } from 'src/routes/paths';
import axios, { endpoints } from 'src/utils/axios';
import { getStorage, removeStorage, setStorage } from 'src/hooks/use-local-storage';

// Constants
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

// ----------------------------------------------------------------------

/**
 * Check if a token is expired based on its expiration time.
 * @param {string} expires - Expiration date in string format
 * @returns {boolean}
 */
export const isTokenExpired = (expires) => {
  const expirationDate = new Date(expires);
  return expirationDate < Date.now();
};

// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------

/**
 * Set access token in local storage and initialize session lifecycle.
 * @param {object|null} token - Access token object containing token string and expiration.
 */
export const setAccessTokenSession = (token) => {
  console.log(token);

  if (token) {
    setStorage(ACCESS_TOKEN_KEY, token);
    handleSessionLife(token.expires);
    axios.defaults.headers.common.Authorization = `Bearer ${token.token}`;
  } else {
    removeStorage(ACCESS_TOKEN_KEY);
    delete axios.defaults.headers.common.Authorization;
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

// ----------------------------------------------------------------------

/**
 * Handle storing both access and refresh tokens in local storage.
 * @param {object} tokens - Object containing both access and refresh tokens.
 */
export const handleTokensSession = (tokens) => {
  setAccessTokenSession(tokens?.access || null);
  setRefreshTokenSession(tokens?.refresh || null);
};

// ----------------------------------------------------------------------

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

    const response = await axios.post(endpoints.auth.refreshTokens, {
      refreshToken: refreshToken.token,
    });

    const tokens = response.data;
    handleTokensSession(tokens);
  } catch (error) {
    alert('Your session has expired. Please log in again.');
    window.location.href = paths.auth.login;
  }
};

export function getDefaultWeekAndDayFromPlan(planMonth) {
  const today = new Date();
  let thisWeekNumber = null;
  let todayPlan = { id: null, number: null };

  // Iterate over each week to find the current week
  for (const week of planMonth.data) {
    const startDate = parseISO(week.startDate);
    const endDate = parseISO(week.endDate);

    // Check if today is within this week's date range
    if (isWithinInterval(today, { start: startDate, end: endDate })) {
      thisWeekNumber = week.weekNumber;

      // Find today's plan day and its cumulative day number
      for (let i = 0; i < week.days.length; i++) {
        const day = week.days[i];
        const dayDate = parseISO(day.date);

        if (isSameDay(today, dayDate)) {
          todayPlan = { id: day.id, number: day.number }; // Assign id and cumulative day
          break; // Exit once today's plan day is found
        }
      }

      break; // Exit once the current week is found
    }
  }

  // Fallbacks in case no matching week or day is found
  if (!thisWeekNumber) {
    thisWeekNumber = 1; // Default to the first week
  }
  if (!todayPlan.id) {
    const firstDay = planMonth.data[0].days[0];
    todayPlan = { id: firstDay.id, number: 1 }; // Default to the first day of the plan
  }

  return { thisWeekNumber, todayPlan };
}
