interface CustomProcessEnv {
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
  if (process.env.NODE_ENV !== 'test') {
    console.log('generateConfig running');
  }
  const obj: Partial<CustomProcessEnv> = {};

  for (let i = 0; i < requiredEnvVariables.length; i++) {
    const envVarName = requiredEnvVariables[i];

    if (!process.env[envVarName]) {
      throw new Error(`Missing required environment variable: ${envVarName}`);
    }

    obj[envVarName] = process.env[envVarName];
  }

  return obj as CustomProcessEnv;
};