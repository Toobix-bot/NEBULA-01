module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    USE_REAL_API: process.env.USE_REAL_API,
  },
  // Optimierungen für Produktion
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};
