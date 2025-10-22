import "reflect-metadata";
import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { UserService } from "../services/UserService";
import { CreateUserDto, UpdateUserDto } from "../models/User";

@injectable()
export class UserController {
  constructor(private userService: UserService) {}

  getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ error: "User ID is required" });
        return;
      }

      const user = this.userService.getUserById(id);

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const createUserDto: CreateUserDto = req.body;

      // Basic validation
      if (
        !createUserDto.name ||
        !createUserDto.email ||
        !createUserDto.department
      ) {
        res
          .status(400)
          .json({ error: "Name, email, and department are required" });
        return;
      }

      const user = this.userService.createUser(createUserDto);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  };

  updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ error: "User ID is required" });
        return;
      }

      const updateUserDto: UpdateUserDto = req.body;

      const user = this.userService.updateUser(id, updateUserDto);
      res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        const status = error.message === "User not found" ? 404 : 400;
        res.status(status).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ error: "User ID is required" });
        return;
      }

      this.userService.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        const status = error.message === "User not found" ? 404 : 400;
        res.status(status).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  };
}
