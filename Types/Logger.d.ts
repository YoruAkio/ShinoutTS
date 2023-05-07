/* import { Logger } from "log4js";

export enum Colors {
    Default = "\x1b[0m",
    Blue = "\x1b[34m",
    Green = "\x1b[32m",
    Yellow = "\x1b[33m",
    Red = "\x1b[31m",
}

export namespace Logger {
    export type KioSend = (levels: "debug" | "info" | "warn" | "error", message: string) => void;
    export type KioLog = (status: "debug" | "info" | "warn" | "error", title: string, message: string) => void;

    export interface KioLogger {
        send: KioSend;
        log: KioLog;

        getTime: (format: string) => string;

        logger: Logger;

        Colors: {
            Default: string;
            Blue: string;
            Green: string;
            Yellow: string;
            Red: string;
            [key: string]: string
        }
} */