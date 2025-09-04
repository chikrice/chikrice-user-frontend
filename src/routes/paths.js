const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  home: '/',
  dashboard: `/dashboard/`,
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
  user: {
    root: `/user`,
    profile: '/user/profile',
    ingredients: '/user/ingredients',
    settings: '/user/settings/',
  },
  auth: {
    login: `${ROOTS.AUTH}/login`,
    coach: `${ROOTS.AUTH}/coach-register`,
    verifyEmail: (email, redirectTo) => `${ROOTS.AUTH}/verify-email?email=${email}&redirectTo=${redirectTo}`,
    register: {
      user: `${ROOTS.AUTH}/register?role=user`,
      coach: `${ROOTS.AUTH}/register?role=coach`,
    },
    newPassword: (token) => `${ROOTS.AUTH}/reset-password?token=${token}`,
    forgotPassword: `${ROOTS.AUTH}/forgot-password`,
    resetPasswordSuccess: `${ROOTS.AUTH}/reset-password-success`,
  },
  userInputs: '/user-inputs',
  progress: '/progress',
  steps: { user: '/steps?role=user', coach: '/steps?role=coach' },
};
