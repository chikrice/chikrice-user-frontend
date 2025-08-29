const getApiUrl = () => {
  const env = import.meta.env.VITE_NODE_ENV || 'development';

  switch (env) {
    case 'production':
      return import.meta.env.VITE_PROD_HOST_API;
    case 'staging':
      return import.meta.env.VITE_STAGING_HOST_API;
    case 'development':
    default:
      return import.meta.env.VITE_DEV_HOST_API;
  }
};

const config = {
  apiUrl: getApiUrl(),
  featureFlag: import.meta.env.VITE_FEATURE_FLAG,
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  mapboxApiKey: import.meta.env.VITE_MAPBOX_API,
};
console.log('Config object:', config);
export default config;
