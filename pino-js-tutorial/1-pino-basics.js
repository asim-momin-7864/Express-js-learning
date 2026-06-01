//* Pino basics

import pino, { destination } from "pino";

// create logger
const logger = pino();

// // basic logging
// logger.info("Hello from pino");
// logger.error("A critical error");
// logger.fatal("Server shut down");

/*

=>
{"level":30,"time":1780305106225,"pid":7295,"hostname":"blue-dragon","msg":"Hello from pino"}
{"level":50,"time":1780305106225,"pid":7295,"hostname":"blue-dragon","msg":"A critical error"}
{"level":60,"time":1780305106226,"pid":7295,"hostname":"blue-dragon","msg":"Server shut down"}

*/

/*
* pino-preety

* > $ node 1-pino-basics.js | npx pino-pretty
[08:57:27.202] INFO (4167): Hello from pino
[08:57:27.202] ERROR (4167): A critical error
[08:57:27.202] FATAL (4167): Server shut down
*/

//------------------------------------------------------------------------------------------------

// we are creating different instance "logger1" to not get mixed with main instance "logger"
const logger1 = pino({
  // custome log levels
  customLevels: { catastrophe: 70 },
  level: "info" || process.env.PINO_LOG_LEVEL, // start logging from which level of logs
  // formate log structure
  formatters: {
    // custome functions for custome outputs
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
});

logger1.catastrophe("Disaster all servers crashed");
// // => [09:02:40.446] USERLVL (5168): Disaster all servers crashed

// logger1.info("A user login");
// logger1.error("Authentication Process");

/*

{"level":"CATASTROPHE","time":1780305106226,"pid":7295,"hostname":"blue-dragon","msg":"Disaster all servers crashed"}
{"level":"INFO","time":1780305106226,"pid":7295,"hostname":"blue-dragon","msg":"A user login"}
{"level":"ERROR","time":1780305106226,"pid":7295,"hostname":"blue-dragon","msg":"Authentication Process"}

*/

//------------------------------------------------------------------------------------------------

// Adding custome JS object in log for data

// logger1.info(
//   { username: "luffy-342", email: "luffy@gmail.com" },
//   "User loggedin into system!",
// );
// logger1.info(
//   { username: "luffy-342", email: "luffy@gmail.com" },
//   "User loggedin into system!",
// );

/*
=>

[09:16:10.599] INFO (8189): User loggedin into system!
    username: "luffy-342"
    email: "luffy@gmail.com"

[09:16:10.599] INFO (8189): User loggedin into system!
    username: "luffy-342"
    email: "luffy@gmail.com"

*/

//* Child logger

// data we need to log in logs (Dummy)
let data = {
  username: "luffy-342",
  mail: "luffy@gmail.com",
};

// child logger
// creating instance from logger1

const usernameLogger = logger1.child(data);
// usernameLogger.info("User loggedin into system!");
// usernameLogger.info("User loggedin into system!");

/*
=>

[09:28:22.180] INFO (10760): User loggedin into system!
    username: "luffy-342"
    mail: "luffy@gmail.com"
[09:28:22.180] INFO (10760): User loggedin into system!
    username: "luffy-342"
    mail: "luffy@gmail.com"

*/

//-------------------------------------------------------------------------------------------------

//* how to log errors

// to create error for testing
function divide(a, b) {
  if (b === 0) {
    throw new Error("cannot divide by 0");
    return;
  }
  return a / b;
}

// try {
//   let result = divide(5, 0);
//   logger.info(`Operation successful! Result: ${result}`);
// } catch (error) {
//   logger.error(error, `Error occured during division`);
// }

/*
=>

    [09:37:08.439] ERROR (12309): Error occured during division
    err: {
      "type": "Error",
      "message": "cannot divide by 0",
      "stack":
          Error: cannot divide by 0
              at divide (file:///mnt/e/Express-js-learning/pino-js-tutorial/1-pino-basics.js:113:15)
              at file:///mnt/e/Express-js-learning/pino-js-tutorial/1-pino-basics.js:120:18
              at ModuleJob.run (node:internal/modules/esm/module_job:437:25)
              at async node:internal/modules/esm/loader:639:26
              at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5)
    }

*/

//--------------------------------------------------------------------------------

//* Transport logs

// single destination transport
const transport = pino.transport({
  // target: "pino/file",  - for normal log format
  target: "pino-pretty", // - for preetier version (recommended)
  options: { destination: "./logs/output.log", mkdir: true },
});

// multiple destination transports
const multipleTransports = pino.transport({
  targets: [
    {
      target: "pino-pretty",
      options: { destination: "./logs/output.log", mkdir: true, colorize: false },
    },
    {
      target: "pino-pretty",
      options: { destination: process.stdout.fd, colorize: true }, // log logs into terminal
    },
  ],
});

// logger
// const logger2 = pino({}, transport); // single destination

const logger2 = pino(
  {
    redact: {
      paths: ["email", "password", "address"],
      remove: true,
    },
    
  },
  multipleTransports,
); // multiple destinations

// generating logs
logger2.info("Hello from pino");
logger2.error("A critical error");
logger2.fatal("Server shut down");
try {
  let result = divide(5, 0);
  logger2.info(`Operation successful! Result: ${result}`);
} catch (error) {
  logger2.error(error, `Error occured during division`);
}

//---------------------------------------------------------------------------------------------

//* Redact data

//! IMP Point - Struture logs like maybe it can be read by anyone, malisious actor also
// so hide IMP, sensitive data

// data
const employee = {
  id: "2314127egdhq",
  name: "John Dev",
  age: 35,
  email: "john@dev.com",
  password: "agd7e98hasdha",
  address: {
    street: "Brick Lane",
    city: "London",
  },
};

// generating logs
logger2.info(employee, "Login employee detailes");
logger2.info(employee, "Login employee detailes");
logger2.info(employee, "Login employee detailes");



/*

[11:03:20.707] INFO (John Dev/20915): Hello from pino
    id: "2314127egdhq"
    age: 35
    email: "[Redacted]"
    password: "[Redacted]"
    address: "[Redacted]"


remove: true    

[11:10:00.504] INFO (John Dev/22379): Hello from pino
    id: "2314127egdhq"
    age: 35

*/
