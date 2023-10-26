import { errorLogger, requestLogger } from "@/lib/logger";
import expressWinston from "express-winston";

export const requestLoggerMiddleware = expressWinston.logger({
  winstonInstance: requestLogger,
});

export const errorLoggerMiddleware = expressWinston.errorLogger({
  winstonInstance: errorLogger,
});
