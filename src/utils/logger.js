import winston from "winston";
const { createLogger, format, transports } = winston;
const { align, colorize, combine, label, printf, timestamp } = format;

export const logger = createLogger({
  format: combine(
    colorize(),
    timestamp(),
    label({ label: "Golf Player" }),
    align(),
    printf(
      info => `${info.label} ${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  level: "debug",
  transports: [new transports.Console()]
});
