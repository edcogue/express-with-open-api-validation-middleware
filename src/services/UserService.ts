import "reflect-metadata";
import { injectable } from "tsyringe";
import { UserRepository } from "../repositories/UserRepository";
import { User, CreateUserDto, UpdateUserDto } from "../models/User";

@injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  getAllUsers(): User[] {
    return this.userRepository.findAll();
  }

  getUserById(id: string): User | undefined {
    return this.userRepository.findById(id);
  }

  createUser(createUserDto: CreateUserDto): User {
    // Check if email already exists
    const existingUser = this.userRepository.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    return this.userRepository.create(createUserDto);
  }

  updateUser(id: string, updateUserDto: UpdateUserDto): User {
    // Check if user exists
    const existingUser = this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error("User not found");
    }

    // Check if email is being updated and if it already exists
    if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
      const userWithEmail = this.userRepository.findByEmail(
        updateUserDto.email
      );
      if (userWithEmail) {
        throw new Error("User with this email already exists");
      }
    }

    const updatedUser = this.userRepository.update(id, updateUserDto);
    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  }

  deleteUser(id: string): boolean {
    const deleted = this.userRepository.delete(id);
    if (!deleted) {
      throw new Error("User not found");
    }
    return deleted;
  }
}
