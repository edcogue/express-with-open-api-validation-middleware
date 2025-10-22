export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  name: string;
  email: string;
  department: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  department?: string;
}
