type UserRole = 'admin' | 'moderator' | 'user';
type UserStatus = 'active' | 'inactive' | 'suspended';

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  lastLogin?: string;
}
