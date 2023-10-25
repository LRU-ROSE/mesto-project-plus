export type Config = {
  ARGON2_PEPPER: Buffer;
  JWT_SECRET: string;
  JWT_EXPIRATION_TIME: string;
};

type OrUndefined<T> = {
  [P in keyof T]: T[P] | undefined;
};
const config: OrUndefined<Config> = {
  ARGON2_PEPPER: process.env.ARGON2_PEPPER
    ? Buffer.from(process.env.ARGON2_PEPPER)
    : undefined,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME,
};

for (const [key, val] of Object.entries(config)) {
  if (val === undefined) {
    throw new Error(`Env ${key} is not defined`);
  }
}

export default config as Config;
