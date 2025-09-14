import { PublicUser } from 'src/users/users.types';

declare module 'express' {
  interface Request {
    user?: PublicUser;
  }
}
