const { transports, createLogger, format } = require("winston");
require("winston-daily-rotate-file");
var LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./scratch");
let LogFileName = localStorage.getItem("LoggerFileName");
const loggerFormat = format.combine(
  format.timestamp({ format: "DD-MM-YYYY-HH.mm.ss" }),
  format.printf((info) => {
    return `${info.timestamp} - [${info.level.toUpperCase().padEnd(4)}]: ${
      info.message
    }`;
  })
);

const Logger = createLogger({
  format: loggerFormat,
  transports: [
    new transports.File({
      filename: "Logger/AutomationLogs_" + LogFileName + ".log",
      options: { flags: "w" },
      level: "info",
      maxsize: "5242880",
    }),
  ],
});
/*
const Logger = createLogger({
  format: loggerFormat,
  transports: [
    new transports.DailyRotateFile({
      filename: "Logger/AutomationLogs(%DATE%).log",
      options: { flags: "w" },
      datePattern: "DD-MM-YYYY",
      level: "info",
      maxsize: "5242880",
    }),
  ],
});*/
module.exports = { Logger };
