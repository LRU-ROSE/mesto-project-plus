import { Request, Response, Router } from "express";
import HTTPCode from "@/lib/codes";

const notFoundRouter = Router();
notFoundRouter.all("*", (req: Request, res: Response) => {
  res.status(HTTPCode.NOT_FOUND).json({ message: 'Запрошенная страница не найдена' });
});

export default notFoundRouter;
