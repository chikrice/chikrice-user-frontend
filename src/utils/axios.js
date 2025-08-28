import axios from 'axios';

import config from 'src/config-global';
import { isTokenExpired } from 'src/store/helpers';
import { getStorage, removeStorage, setStorage } from 'src/hooks/use-local-storage';
// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: config.apiUrl });

// Token refresh state to prevent multiple simultaneous refresh calls
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
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

    return Promise.reject((error.response && error.response.data) || 'Something went wrong');
  }
);

export { axiosInstance as api };

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
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
    coachRegister: `${API_VERSION}/auth/register-coach`,
    register: `${API_VERSION}/auth/register`,
    google: `${API_VERSION}/auth/google-login`,
    logout: `${API_VERSION}/auth/logout`,
    refreshTokens: `${API_VERSION}/auth/refresh-tokens`,
  },
  search: {
    root: `${API_VERSION}/search`,
  },
  review: {
    add: `${API_VERSION}/review/add`,
    delete: (id) => `${API_VERSION}/review/delete/${id}`,
    update: (id) => `${API_VERSION}/review/update/${id}`,
  },
  coach: {
    list: `${API_VERSION}/coaches/`,
    root: (id) => `${API_VERSION}/coaches/coach/${id}`,
    client: {
      root: `${API_VERSION}/coaches/client`,
      list: (id) => `${API_VERSION}/coaches/clients/${id}`,
    },
  },
  user: {
    id: (userId) => `${API_VERSION}/users/${userId}`,
    update: (id) => `${API_VERSION}/users/${id}`,
    orders: (id) => `${API_VERSION}/users/orders/${id}`,
    initCollab: (id) => `${API_VERSION}/users/init-coach-collab/${id}`,
    preferences: (userId) => `${API_VERSION}/users/preferences/${userId}`,
    ingredients: (userId) => `${API_VERSION}/users/custom-ingredients/${userId}`,
    processIngredients: (userId) => `${API_VERSION}/users/process-ingredient-prompt/${userId}`,
  },
  address: {
    create: `${API_VERSION}/users/address`,
    update: (id) => `${API_VERSION}/users/address/${id}`,
    delete: (id) => `${API_VERSION}/users/address/${id}`,
  },
  roadmap: {
    root: (id) => `${API_VERSION}/roadmaps/${id}`,
    create: `${API_VERSION}/roadmaps/`,
    updateActivityLog: (roadmapId) => `${API_VERSION}/roadmaps/activity-log/${roadmapId}`,
  },
  ingredient: {
    search: `${API_VERSION}/ingredients/user/search/`,
    categories: `${API_VERSION}/ingredients/categories/`,
  },
  plan_month: {
    get: (id) => `${API_VERSION}/plans-month/${id}`,
    create: `${API_VERSION}/plans-month/`,
    suggestions: (id) => `${API_VERSION}/\plans-month/suggestions/${id}`,
  },
  plans: {
    root: `${API_VERSION}/plans/`,
    id: (planId) => `${API_VERSION}/plans/${planId}`,

    meals: {
      id: (mealId) => `${API_VERSION}/plans/meal/${mealId}`,
      create: (planId) => `${API_VERSION}/plans/meal/${planId}`,
      toggleMode: (planId) => `${API_VERSION}/plans/meal/toggle-mode/${planId}`,
      suggestions: (mealId) => `${API_VERSION}/plans/meal/suggestions/${mealId}`,
      addSuggested: (mealId) => `${API_VERSION}/plans/meal/add-suggested/${mealId}`,
      toggleIngredient: (planId) => `${API_VERSION}/plans/meal/toggle-ingredient/${planId}`,
    },
  },
  faqs: `${API_VERSION}/faqs`,
};
