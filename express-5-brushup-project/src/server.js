//* Express server
// mini CRUD with JWT authentication project
// centralized error handling

// 3rd-party modules
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { expressMiddleware } from "pino-correlation-id";
import { getLogger } from "pino-correlation-id";
import pinoHttp from "pino-http";

// User define modules
import { reqLogger } from "./utils/logger.js";
import { connectionDB } from "./config/db.config.js";
import userRouter from "./models/user/user.route.js";
import subRouter from "./models/subscription/subscription.route.js";
import { baseLogger } from "./config/logger.config.js";

// initialization
const app = express();

// Global middlewares
app.use(express.json());

//log setup
// request-id generation
// 1. FIRST: Initialize Correlation Context
// This creates the execution thread and generates the 'reqId'.
// Any controller down the line can now call getLogger().
app.use(expressMiddleware({ logger: baseLogger }));

// 2. SECOND: Initialize HTTP Telemetry
// pino-http will track response times and status codes.
// We configure it to use the baseLogger and tell it not to generate its own reqId.
app.use(
  pinoHttp({
    logger: baseLogger,
    // Prevent pino-http from generating conflicting IDs; let correlation-id handle it
    genReqId: (req) => req.id,

    // Simplify the output so it only logs when the request finishes (latency tracking)
    serializers: {
      req: (req) => ({
        method: req.method,
        url: req.url,
        // We drop req.headers completely to avoid logging passwords or cookies
      }),
      res: (res) => ({
        statusCode: res.statusCode,
        // We drop res.headers completely to avoid leaking JWTs in the Set-Cookie header
      }),
    },

    // Optional: Format the automatic success/error messages
    customSuccessMessage: (req, res) =>
      `HTTP ${req.method} ${req.url} completed`,
    customErrorMessage: (req, res, err) =>
      `HTTP ${req.method} ${req.url} failed`,
  }),
);

app.use(cors());
app.use(cookieParser());
app.use(reqLogger);
app.use(helmet());

// DB Connection
connectionDB();

//-----------------------------------------------------------------------------------

//* routes

// home, static files
app.get("/", (req, res) => {
  // console.log(req);
  res.status(200).send({ message: "Welcome! to home route." });
});

// user
app.use("/api/user", userRouter); // register routes

// subscription
app.use("/api/subscription", subRouter);

//---------------------------------------------------------------------------
//* Central Error handling middleware
app.use((err, req, res, next) => {
  const logger = getLogger();

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  if (statusCode >= 500) {
    // ONLY print stack traces for 500 system crashes
    logger.error(err, `Unhandled System Exception: ${message}`);
  } else {
    // Print clean, single-line warnings for 4xx user errors
    logger.warn({ status: statusCode }, `Client Validation Reject: ${message}`);
  }

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
});

// port
const port = process.env.PORT || 4000;

// listening
app.listen(port, () => {
  // console.log(`server is listing on port ${port}`);
  baseLogger.info("subTrack server successfully intialized on port 4000");
});
