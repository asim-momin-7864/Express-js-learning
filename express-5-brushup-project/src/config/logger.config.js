//* Pino logger configuration

// 3rd party modules
import pino, { destination, levels } from "pino";
import path from "path";

// log file path
const logFilePath = path.join( import.meta.dirname, "..", "..", "logs", "output.log");

// Add this line temporarily!
console.log("🔥 DEBUG PATH:", logFilePath);

// transport
const transports = pino.transport({
  targets: [
    // {
    //   target: "pino-pretty",
    //   options: {
    //     // destination: "../../logs/output.log",
    //     destination: logFilePath,
    //     mkdir: false,
    //     colorize: true,
    //   },
    // },
    {
      target: "pino-pretty",
      options: {
        destination: process.stdout.fd,
        colorize: true,
      },
    },

    //TODO better stack logs transport config
  ],
});

// logger
export const baseLogger = pino(
  {
    level: process.env.PINO_LOG_LEVEL || "info",
    redact: {
      paths: ["password", "token"],
      remove: true,
    },
    formatters: {
      level: (label) => ({ level: label.toUpperCase() }),
    },
  },
  transports,
);

/*

! ERROR: due to File Paths

The reason your logs are completely missing from both the terminal and 
your log file is due to an internal issue with
 how Node.js asynchronously registers es-module (import) code paths relative to multi-target threads in Pino.

Because you are using pino.transport(), 
Pino spawns a completely separate, 
isolated background system thread (a Node Worker Thread) to handle writing your logs without
blocking your main application performance.

When your file paths use relative notations like ../../logs/output.log inside a thread, 
the worker breaks because its working reference directory is not what you think it is. 
This causes the internal thread to quietly crash or hang, 
which instantly silences your terminal console logging stream too.

The Fix: Force Absolute File Layout Paths
To solve this, use Node's native URL and path modules to construct 
an un-splittable, explicit Absolute Path that 
works across background worker systems.

*/
