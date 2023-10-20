import express from "express";
import mongoose from "mongoose";
import ErrorHandler from "./lib/errorHandler";
import router from "./routers";
import { UserRequest } from "./lib/userRequest";

const PORT = 3000;

const app = express();

app.use(express.json());

app.use((req: UserRequest, res, next) => {
  req.user = {
    _id: "65327ff35c6c77186e647395",
  };

  next();
});

app.use(router);

// Глобальный обработчик ошибок. Благодаря этой магии все контроллеры выше не нужно
// оборачивать в try/catch. Эта штука сама всё словит. Не верите - проверьте сами.
app.use(ErrorHandler);

const main = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

  app.listen(PORT, () => {
    console.log(`Приложение запущено на порту ${PORT}`);
  });
};

main().catch((e) => console.error("Ошибка при запуске программы", e));
