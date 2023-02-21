import { Router } from "express";
import {
  createUsersController,
  deleteUserController,
  listUsersController,
  retrieveUserController,
  retrieveUserProfileController,
  patchUserController,
  activateUserController
} from "../controllers/users.controllers";
import ensureUserExistsMiddleware from "../middlewares/ensureUserExists.middleware";
import { createUserSchema, patchUserSchema } from "../schemas/users.schemas";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureIsAdmin from "../middlewares/ensureIsAdmin.middleware";
import checkEmailExistsMiddleware from "../middlewares/checkEmailExists.middleware";

const userRoutes: Router = Router();

userRoutes.post("", ensureDataIsValidMiddleware(createUserSchema), checkEmailExistsMiddleware, createUsersController),
userRoutes.get("", ensureTokenIsValidMiddleware, ensureIsAdmin, listUsersController),
userRoutes.get("/:id", ensureTokenIsValidMiddleware, ensureUserExistsMiddleware, retrieveUserController),
userRoutes.get("/profile", ensureTokenIsValidMiddleware, retrieveUserProfileController),
userRoutes.patch("/:id", ensureTokenIsValidMiddleware, ensureUserExistsMiddleware, ensureDataIsValidMiddleware(patchUserSchema), checkEmailExistsMiddleware, patchUserController);
userRoutes.delete("/:id", ensureTokenIsValidMiddleware, ensureUserExistsMiddleware, deleteUserController);
userRoutes.put("/:id/recover", ensureTokenIsValidMiddleware, ensureIsAdmin, ensureUserExistsMiddleware, activateUserController);

export default userRoutes;
