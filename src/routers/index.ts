import { Router } from "express";
import authMiddleware from "@/middleware/auth";
import { requestLogger, errorLogger } from "@/middleware/logger";
import { createNewUser, login } from "@/controllers/users";
import usersRouter from "./users";
import cardsRouter from "./cards";
import notFoundRouter from "./notFound";

const router = Router();
router.use(requestLogger);
router.use("/users", authMiddleware, usersRouter);
router.use("/cards", authMiddleware, cardsRouter);
router.post("/signin", login);
router.post("/signup", createNewUser);
router.use("*", notFoundRouter);
router.use(errorLogger);

export default router;
