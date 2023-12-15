export interface CustomProcessEnv {
  DATABASE_URL: string;
  TWITCH_CLIENT_ID: string;
  TWITCH_CLIENT_SECRET: string;
}

const requiredEnvVariables = [
  'DATABASE_URL',
  'TWITCH_CLIENT_ID',
  'TWITCH_CLIENT_SECRET',
] as (keyof CustomProcessEnv)[];

export const generateConfig = (): CustomProcessEnv => {
  console.log('helper DATABASE_URL', process.env.DATABASE_URL);
  console.log('helper TWITCH_CLIENT_ID', process.env.TWITCH_CLIENT_ID);
  console.log('helper TWITCH_CLIENT_SECRET', process.env.TWITCH_CLIENT_SECRET);

  const obj: Partial<CustomProcessEnv> = {};

  for (let i = 0; i < requiredEnvVariables.length; i++) {
    const envVarName: keyof CustomProcessEnv = requiredEnvVariables[i];

    if (!process.env[envVarName]) {
      throw new Error(`Missing required environment variable: ${envVarName}`);
    }

    obj[envVarName] = process.env[envVarName];
  }

  return obj as CustomProcessEnv;
};
