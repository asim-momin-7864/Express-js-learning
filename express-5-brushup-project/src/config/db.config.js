// 3rd party modules
import mongoose from "mongoose";

//* use baseLogger (direct pino)
import { baseLogger } from "./logger.config.js";

//! getLogger - Not Work Outside
// import { getLogger } from "pino-correlation-id";
/*

When your server first boots up, it calls connectionDB(). 
Because this happens at application startup, 
there is no HTTP request happening yet. 
No user has hit a route in Insomnia. Therefore, 
pino-correlation-id has no asynchronous context thread to look up, 
causing getLogger() to return undefined. When you try to call .info() on undefined, Node throws a TypeError.

The Fix: Use the baseLogger for System Events
For global startup actions—like connecting to MongoDB, 
spinning up the Express app, or tracking cron jobs—you should bypass the correlation utility 
and import your baseLogger directly from your configuration file.

*/

export const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    // console.log("Connected to DB!");
    baseLogger.info("MongoDB is connected successfully to server");
  } catch (error) {
    baseLogger.fatal(
      error,
      "Critical System Failure: MongoDB connection Failed",
    );
    process.exit(1);
  }
};
