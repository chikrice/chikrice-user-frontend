import axios from 'axios';

import config from 'src/config-global';
// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: config.apiUrl });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

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
    get: (id) => `${API_VERSION}/users/${id}`,
    update: (id) => `${API_VERSION}/users/${id}`,
    orders: (id) => `${API_VERSION}/users/orders/${id}`,
    initCollab: (id) => `${API_VERSION}/users/init-coach-collab/${id}`,
  },
  address: {
    create: `${API_VERSION}/users/address`,
    update: (id) => `${API_VERSION}/users/address/${id}`,
    delete: (id) => `${API_VERSION}/users/address/${id}`,
  },
  roadmap: {
    root: (id) => `${API_VERSION}/roadmaps/${id}`,
    create: `${API_VERSION}/roadmaps/`,
    updateActivityLog: (id) => `${API_VERSION}/roadmaps/activity-log/${id}`,
  },
  ingredient: {
    search: `${API_VERSION}/ingredients/user/search/`,
    categories: `${API_VERSION}/ingredients/categories/`,
  },
  plan_month: {
    get: (id) => `${API_VERSION}/plans-month/${id}`,
    create: `${API_VERSION}/plans-month/`,
    suggestions: (id) => `${API_VERSION}/plans-month/suggestions/${id}`,
  },
  plan_day: {
    root: (id) => `${API_VERSION}/plans-day/${id}`,
    meal: {
      root: (id) => `${API_VERSION}/plans-day/meal/${id}`,
      copy: (id) => `${API_VERSION}/plans-day/meal/copy/${id}`,
      switch: (id) => `${API_VERSION}/plans-day/meal/switch/${id}`,
      shuffle: (id) => `${API_VERSION}/plans-day/meal/shuffle/${id}`,
      toggleMode: (id) => `${API_VERSION}/plans-day/meal/toggle-mode/${id}`,
      submitMealWithAi: (id) => `${API_VERSION}/plans-day/meal/ai-entry/${id}`,
      addSuggestedMeal: (id) => `${API_VERSION}/plans-day/meal/add-suggested/${id}`,
      toggleIngredient: (id) => `${API_VERSION}/plans-day/meal/toggle-ingredient/${id}`,
    },
  },
  plans: {
    root: `${API_VERSION}/plans/`,
    id: (planId) => `${API_VERSION}/plans/${planId}`,

    meals: {
      id: (mealId) => `${API_VERSION}/plans/meal/${mealId}`,
      create: (planId) => `${API_VERSION}/plans/meal/${planId}`,
      suggestions: (mealId) => `${API_VERSION}/plans/meal/suggestions/${mealId}`,
    },
  },
  faqs: `${API_VERSION}/faqs`,
};
