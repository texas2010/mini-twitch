/** @type {import('next').NextConfig} */

const requiredEnvVariables = [
  'DATABASE_URL',
  'TWITCH_CLIENT_ID',
  'TWITCH_CLIENT_SECRET',
];

const validateEnv = () => {
  console.log('validateEnv running');
  for (let i = 0; i < requiredEnvVariables.length; i++) {
    const envVarName = requiredEnvVariables[i];
    if (!process.env[envVarName]) {
      throw new Error(`Missing required environment variable: ${envVarName}`);
    }
  }
};

validateEnv();

const nextConfig = {};

module.exports = nextConfig;
