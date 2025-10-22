import "reflect-metadata";
import { injectable } from "tsyringe";
import { User, CreateUserDto, UpdateUserDto } from "../models/User";

@injectable()
export class UserRepository {
  private users: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@company.com",
      department: "Engineering",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@company.com",
      department: "Marketing",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob.johnson@company.com",
      department: "IT",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  private nextId = 4;

  findAll(): User[] {
    return this.users;
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  create(createUserDto: CreateUserDto): User {
    const now = new Date();
    const user: User = {
      id: this.nextId.toString(),
      ...createUserDto,
      createdAt: now,
      updatedAt: now,
    };

    this.nextId++;
    this.users.push(user);
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto): User | undefined {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return undefined;
    }

    const existingUser = this.users[userIndex];
    if (!existingUser) {
      return undefined;
    }

    const updatedUser: User = {
      id: existingUser.id,
      name: updateUserDto.name ?? existingUser.name,
      email: updateUserDto.email ?? existingUser.email,
      department: updateUserDto.department ?? existingUser.department,
      createdAt: existingUser.createdAt,
      updatedAt: new Date(),
    };

    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  delete(id: string): boolean {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return false;
    }

    this.users.splice(userIndex, 1);
    return true;
  }
}
