import fs from "fs";
import path from "path";

const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const errorLogFile = path.join(logDir, "error.log");
const accessLogFile = path.join(logDir, "access.log");

const timestamp = () => new Date().toISOString();

export const logger = {
  error: (message: string, extra?: any) => {
    let logMessage = message;
    if (extra) logMessage += " | " + JSON.stringify(extra);
    const log = `[${timestamp()}] ERROR: ${logMessage}\n`;
    fs.appendFileSync(errorLogFile, log);
    console.error(log);
  },

  info: (message: string, extra?: any) => {
    let logMessage = message;
    if (extra) logMessage += " | " + JSON.stringify(extra);
    const log = `[${timestamp()}] INFO: ${logMessage}\n`;
    fs.appendFileSync(accessLogFile, log);
    console.log(log);
  },
};
