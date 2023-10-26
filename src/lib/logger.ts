import winston from "winston";
import "winston-daily-rotate-file";

const requestTransport = new winston.transports.DailyRotateFile({
  filename: "logs/requests/request-%DATE%.log",
  datePattern: "YYYY-MM-DD-HH",
  maxSize: "50m",
  maxFiles: "3d",
});

export const requestLogger = winston.createLogger({
  format: winston.format.json(),
  transports: [requestTransport],
});

const errorTransport = new winston.transports.DailyRotateFile({
  filename: "logs/errors/error-%DATE%.log",
  datePattern: "YYYY-MM-DD-HH",
  maxSize: "50m",
  maxFiles: "7d",
});

export const errorLogger = winston.createLogger({
  format: winston.format.json(),
  transports: [errorTransport],
});
