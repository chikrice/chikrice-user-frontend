import { _id } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
  SUBSCRIPTIONS: '/subscriptions',
};

// ----------------------------------------------------------------------

export const paths = {
  home: '/',
  dashboard: `/dashboard/`,

  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  learn: '/learn',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
  product: {
    root: `/product`,
    details: (id) => `/product/${id}`,
    category: (category) => `/product/category/${category}`,
    demo: {
      details: `/product/${MOCK_ID}`,
    },
  },
  checkout: {
    root: '/checkout',
  },
  user: {
    root: `/user`,
    profile: '/user/profile',
    ingredients: '/user/ingredients',
    coach: '/user/coach-profile',
    subscriptions: '/user/subscriptions',
    orders: '/user/orders/',
    settings: '/user/settings/',
    plan_customization: '/user/plan-customization/',
    order: (id) => `/user/order/${id}`,
  },
  auth: {
    login: `${ROOTS.AUTH}/login`,
    coach: `${ROOTS.AUTH}/coach-register`,
    verify: `${ROOTS.AUTH}/verify`,
    register: {
      user: `${ROOTS.AUTH}/register?role=user`,
      coach: `${ROOTS.AUTH}/register?role=coach`,
    },
    newPassword: `${ROOTS.AUTH}/new-password`,
    forgotPassword: `${ROOTS.AUTH}/forgot-password`,
  },

  // SUBSCRIPTIONS
  subscriptions: {
    root: `${ROOTS.SUBSCRIPTIONS}`,
    general: `${ROOTS.SUBSCRIPTIONS}/general`,
    custom: `${ROOTS.SUBSCRIPTIONS}/custom`,
  },

  welcome: '/welcome',
  intro: '/intro',
  userInputs: '/user-inputs',
  menu: '/menu',
  progress: '/progress',
  steps: { user: '/steps?role=user', coach: '/steps?role=coach' },
  clients: '/clients',
  client: (id) => `/client/${id}`,
  coach: '/coach',
  meal: (id) => `/meal/${id}`,
};
