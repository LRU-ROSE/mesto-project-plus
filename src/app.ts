import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import ErrorHandler from "./lib/errorHandler";
import router from "./routers";

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);

app.use(ErrorHandler);

const main = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

  app.listen(PORT, () => {
    console.log(`Приложение запущено на порту ${PORT}`);
  });
};

main().catch((e) => console.error("Ошибка при запуске программы", e));
