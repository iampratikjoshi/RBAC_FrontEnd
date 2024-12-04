export type Role = 'admin' | 'moderator' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: 'active' | 'inactive';
}

export interface Permission {
  id: string;
  name: string;
  roles: Role[];
}

export interface RoleDefinition {
  name: Role;
  permissions: string[];
}