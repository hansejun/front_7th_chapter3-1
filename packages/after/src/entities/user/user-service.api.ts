import { DEFAULT_USERS, USERS_STORAGE_KEY } from './user-constants.config';
import type { User } from './user-type.model';
import {
  checkEmailDuplicated,
  checkUsernameDuplicated,
  createNewUser,
  createNewUsers,
  createUpdatedUser,
  createUpdatedUsers,
  filterUserById,
  findUserById,
  getUserById,
  isUserAlreadyExistsByEmail,
  isUserAlreadyExistsByUsername,
} from './user-utils.lib';

// TODO: 로컬 스토리지 유틸 shared로 이동
const getUsers = (): User[] => {
  const data = localStorage.getItem(USERS_STORAGE_KEY);
  return data ? JSON.parse(data) : DEFAULT_USERS;
};

// TODO: 로컬 스토리지 유틸 shared로 이동
const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

export const userService = {
  async getAll(): Promise<User[]> {
    return getUsers();
  },

  async getById(id: number): Promise<User | null> {
    const users = getUsers();
    return getUserById(users, id);
  },

  async create(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const users = getUsers();

    if (checkUsernameDuplicated(users, userData.username)) {
      throw new Error('Username already exists');
    }

    if (checkEmailDuplicated(users, userData.email)) {
      throw new Error('Email already exists');
    }

    const newUser: User = createNewUser(users, userData);
    const newUsers = createNewUsers(users, newUser);

    saveUsers(newUsers);
    return newUser;
  },

  async update({
    id,
    userData,
  }: {
    id: number;
    userData: Partial<Omit<User, 'id' | 'createdAt'>>;
  }): Promise<User> {
    const users = getUsers();
    const user = findUserById(users, id);

    if (!user) {
      throw new Error('User not found');
    }

    if (isUserAlreadyExistsByUsername(users, userData)) {
      throw new Error('Username already exists');
    }

    if (isUserAlreadyExistsByEmail(users, userData)) {
      throw new Error('Email already exists');
    }

    const updatedUser = createUpdatedUser(user, userData);
    const updatedUsers = createUpdatedUsers(users, updatedUser);

    saveUsers(updatedUsers);
    return updatedUser;
  },

  async delete(id: number): Promise<void> {
    const users = getUsers();
    const filteredUsers = filterUserById(users, id);

    if (users.length === filteredUsers.length) {
      throw new Error('User not found');
    }

    saveUsers(filteredUsers);
  },

  async checkUsernameAvailable(username: string): Promise<boolean> {
    const users = getUsers();
    return !checkUsernameDuplicated(users, username);
  },

  async checkEmailAvailable(email: string): Promise<boolean> {
    const users = getUsers();
    return !checkEmailDuplicated(users, email);
  },
};
