import type { User } from './user-type.model';

/** 유저 데이터 저장 키 */
export const USERS_STORAGE_KEY = 'users_data';

/** 유저 데이터 기본 값 */
export const DEFAULT_USERS: User[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-01',
    lastLogin: '2024-01-20',
  },
  {
    id: 2,
    username: 'john_doe',
    email: 'john@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-05',
    lastLogin: '2024-01-19',
  },
  {
    id: 3,
    username: 'jane_smith',
    email: 'jane@example.com',
    role: 'moderator',
    status: 'active',
    createdAt: '2024-01-10',
  },
  {
    id: 4,
    username: 'bob',
    email: 'bob@example.com',
    role: 'user',
    status: 'suspended',
    createdAt: '2024-01-15',
  },
];
