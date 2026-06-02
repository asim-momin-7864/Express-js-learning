//* Middleware for generating logs

//3rd party module
import { getLogger } from "pino-correlation-id";

export const reqLogger = (req, res, next) => {
  const logger = getLogger();

  logger.info(
    {
      method: req.method,
      url: req.originalUrl || req.url,
      ip: req.ip,
    },
    "Incoming Http Request",
  );

  next();
};
