import axios from 'axios';

import config from 'src/config-global';
import { isTokenExpired } from 'src/store/helpers';
import { getStorage, removeStorage, setStorage } from 'src/hooks/use-local-storage';
// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: config.apiUrl });

// Token refresh state to prevent multiple simultaneous refresh calls
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error: unknown, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor - Add auth header automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getStorage('accessToken');
    if (accessToken && !isTokenExpired(accessToken.expires)) {
      config.headers.Authorization = `Bearer ${accessToken.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle token refresh automatically
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Check if this is an auth endpoint (login, register, etc.) - don't refresh for these
      const isAuthEndpoint = originalRequest.url?.includes('/auth/');

      if (isAuthEndpoint) {
        // For auth endpoints, don't try to refresh - just return the original error
        return Promise.reject((error.response && error.response.data) || 'Authentication failed');
      }

      if (isRefreshing) {
        // If we're already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = getStorage('refreshToken');

        if (!refreshToken || isTokenExpired(refreshToken.expires)) {
          throw new Error('Refresh token expired');
        }

        // Call refresh token endpoint
        const response = await axios.post(`${config.apiUrl}/v1/auth/refresh-tokens`, {
          refreshToken: refreshToken.token,
        });

        const { access, refresh } = response.data;

        // Update tokens in storage
        setStorage('accessToken', access);
        setStorage('refreshToken', refresh);

        // Update axios default header
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${access.token}`;

        // Process queued requests
        processQueue(null, access.token);

        // Retry the original request
        originalRequest.headers.Authorization = `Bearer ${access.token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        removeStorage('accessToken');
        removeStorage('refreshToken');
        delete axiosInstance.defaults.headers.common.Authorization;

        processQueue(refreshError, null);

        // Only redirect if we're not already on login page
        if (window.location.pathname !== '/auth/login') {
          window.location.href = '/auth/login';
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // For non-401 errors or after refresh attempts, return the original error
    return Promise.reject((error.response && error.response.data) || 'Something went wrong');
  }
);

export { axiosInstance as api };

// ----------------------------------------------------------------------

export const fetcher = async (args: unknown) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

const API_VERSION = '/v1';

export const endpoints = {
  auth: {
    me: `${API_VERSION}/auth/me`,
    login: `${API_VERSION}/auth/login`,
    register: `${API_VERSION}/auth/register`,
    google: `${API_VERSION}/auth/google-login`,
    logout: `${API_VERSION}/auth/logout`,
    refreshTokens: `${API_VERSION}/auth/refresh-tokens`,
    forgotPassword: `${API_VERSION}/auth/forgot-password`,
    verifyEmailCode: `${API_VERSION}/auth/verify-email-code`,
    sendVerificationCode: `${API_VERSION}/auth/send-verification-code`,
    resendVerificationCode: `${API_VERSION}/auth/resend-verification-code`,
    resetPassword: (token: string) => `${API_VERSION}/auth/reset-password?token=${token}`,
  },

  user: {
    id: (userId: string) => `${API_VERSION}/users/${userId}`,
    preferences: (userId: string) => `${API_VERSION}/users/preferences/${userId}`,
    ingredients: (userId: string) => `${API_VERSION}/users/custom-ingredients/${userId}`,
    processIngredients: (userId: string) => `${API_VERSION}/users/process-ingredient-prompt/${userId}`,
  },

  roadmap: {
    root: (id: string) => `${API_VERSION}/roadmaps/${id}`,
    create: `${API_VERSION}/roadmaps/`,
    updateActivityLog: (roadmapId: string) => `${API_VERSION}/roadmaps/activity-log/${roadmapId}`,
  },

  ingredient: {
    search: `${API_VERSION}/ingredients/user/search/`,
  },

  plans: {
    root: `${API_VERSION}/plans/`,
    id: (planId: string) => `${API_VERSION}/plans/${planId}`,
    meals: {
      id: (mealId: string) => `${API_VERSION}/plans/meal/${mealId}`,
      suggestions: (mealId: string) => `${API_VERSION}/plans/meal/suggestions/${mealId}`,
      addSuggested: (mealId: string) => `${API_VERSION}/plans/meal/add-suggested/${mealId}`,
    },
  },

  faqs: `${API_VERSION}/faqs`,
};
