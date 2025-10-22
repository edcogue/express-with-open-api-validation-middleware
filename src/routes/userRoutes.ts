import { Router } from "express";
import { container } from "tsyringe";
import { UserController } from "../controllers/UserController";

const router = Router();
const userController = container.resolve(UserController);

/**
 * @route GET /api/users
 * @desc Get all users
 * @access Public
 */
router.get("/", userController.getAllUsers);

/**
 * @route GET /api/users/:id
 * @desc Get user by ID
 * @access Public
 */
router.get("/:id", userController.getUserById);

/**
 * @route POST /api/users
 * @desc Create a new user
 * @access Public
 */
router.post("/", userController.createUser);

/**
 * @route PUT /api/users/:id
 * @desc Update user by ID
 * @access Public
 */
router.put("/:id", userController.updateUser);

/**
 * @route DELETE /api/users/:id
 * @desc Delete user by ID
 * @access Public
 */
router.delete("/:id", userController.deleteUser);

export default router;
