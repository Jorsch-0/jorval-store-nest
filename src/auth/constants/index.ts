import { CookieOptions } from 'express';
import ms, { StringValue } from 'ms';
import { env } from 'src/config';

const isProd = env.NODE_ENV === 'production';

const baseCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProd,
};

export const accessTokenCookieOptions: CookieOptions = {
  ...baseCookieOptions,
  maxAge: ms(env.JWT_ACCESS_EXPIRES_IN as StringValue),
};

export const refreshTokenCookieOptions: CookieOptions = {
  ...baseCookieOptions,
  maxAge: ms(env.JWT_REFRESH_EXPIRES_IN as StringValue),
};
