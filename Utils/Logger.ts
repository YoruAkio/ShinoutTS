import { debug } from "console";
import * as log4js from "log4js";

export enum Colors {
  Default = "\x1b[0m",
  Blue = "\x1b[34m",
  Green = "\x1b[32m",
  Yellow = "\x1b[33m",
  Red = "\x1b[31m",
}

export class Logger {
  public send(
    levels: "debug" | "info" | "warn" | "error",
    message: string
  ): void {
    var logger = log4js.getLogger("Machi");
    logger.level = levels;
    logger.info(message);
  }

  public log(
    status: "debug" | "info" | "warn" | "error",
    title: string,
    message: string
  ): void {
    console[status](
      `${
        status === "debug"
          ? Colors.Blue
          : status === "error"
          ? Colors.Red
          : status === "warn"
          ? Colors.Yellow
          : Colors.Blue
      }[${this.getTime("hh:ii:ss yyyy-mm-dd")}] [${title}] ${
        Colors.Default
      }${message}`
    );
  }

  private getTime(format: string) {
    const date = new Date();
    const padStart = (value: number): string =>
      value.toString().padStart(2, "0");
    return format
      .replace(/yyyy/g, padStart(date.getFullYear()))
      .replace(/dd/g, padStart(date.getDate()))
      .replace(/mm/g, padStart(date.getMonth() + 1))
      .replace(/hh/g, padStart(date.getHours()))
      .replace(/ii/g, padStart(date.getMinutes()))
      .replace(/ss/g, padStart(date.getSeconds()));
  }
}
