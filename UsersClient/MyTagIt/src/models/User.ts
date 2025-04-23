export enum RoleType {
  Admin = 0,
  Editor = 1,
  User = 2,
}

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: RoleType;
}