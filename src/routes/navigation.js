// src/routes/navigation.js
let _navigate;

export const setNavigate = (nav) => {
  _navigate = nav;
};

const ensureReady = () => {
  if (!_navigate) throw new Error('Router not ready yet');
};

export const router = {
  push: (to, options) => {
    ensureReady();
    return _navigate(to, options);
  },
  replace: (to, options) => {
    ensureReady();
    return _navigate(to, { ...options, replace: true });
  },
  back: () => window.history.back(),
  forward: () => window.history.forward(),
  reload: () => window.location.reload(),
};
