import 'dotenv/config';
import z from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().int().min(0).max(65535).default(8000),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  DATABASE_URL: z.url(),
  JWT_ACCESS_SECRET: z.string(),
  JWT_ACCESS_EXPIRES_IN: z.string().default('1h'),
  JWT_REFRESH_SECRET: z.string(),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
});

type Env = z.infer<typeof envSchema>;

export const env: Env = envSchema.parse(process.env);
