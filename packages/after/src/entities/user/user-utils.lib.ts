import { compareLowerCase } from '@/shared/lib/utils';
import type { User } from './user-type.model';

export const checkUsernameDuplicated = (users: User[], username: string) => {
  return users.some(u => compareLowerCase(u.username, username));
};

export const checkEmailDuplicated = (users: User[], email: string) => {
  return users.some(u => compareLowerCase(u.email, email));
};
