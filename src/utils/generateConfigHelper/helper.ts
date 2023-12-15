export interface CustomProcessEnv extends NodeJS.ProcessEnv {
  DATABASE_URL: string;
  TWITCH_CLIENT_ID: string;
  TWITCH_CLIENT_SECRET: string;
}

const requiredEnvVariables = [
  'DATABASE_URL',
  'TWITCH_CLIENT_ID',
  'TWITCH_CLIENT_SECRET',
] as (keyof CustomProcessEnv)[];

export const generateConfig = () => {
  console.log('generateConfig running');
  const obj: {
    [key: keyof CustomProcessEnv]: unknown;
  } = {};

  for (let i = 0; i < requiredEnvVariables.length; i++) {
    const envVarName: keyof CustomProcessEnv = requiredEnvVariables[i];

    if (!process.env[envVarName]) {
      throw new Error(`Missing required environment variable: ${envVarName}`);
    }

    obj[envVarName] = process.env[envVarName];
  }

  return obj;
};
