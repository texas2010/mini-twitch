import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      console.log('config.env.NODE_ENV:', config.env.NODE_ENV);
      // return config;
    },
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
