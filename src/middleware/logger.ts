import winston from "winston";
import expressWinston from "express-winston";
import "winston-daily-rotate-file";

const requestTransport = new winston.transports.DailyRotateFile({
  filename: "logs/requests/request-%DATE%.log",
  datePattern: "YYYY-MM-DD-HH",
  maxSize: "50m",
  maxFiles: "3d",
});

const errorTransport = new winston.transports.DailyRotateFile({
  filename: "logs/errors/error-%DATE%.log",
  datePattern: "YYYY-MM-DD-HH",
  maxSize: "50m",
  maxFiles: "7d",
});

export const requestLogger = expressWinston.logger({
  transports: [requestTransport],
  format: winston.format.json(),
});

export const errorLogger = expressWinston.errorLogger({
  transports: [errorTransport],
  format: winston.format.json(),
});
