import pino from "pino";
import pinoElastic from "pino-elasticsearch";
import { ILogger } from "@core/interfaces/services/logger.interface";

export class LoggerPino implements ILogger {
  private logger: pino.Logger;

  constructor(service: string, method: string) {
    const streamToElastic = pinoElastic({
      index: "logs",
      esVersion: 7,
      flushBytes: 1000,
      node: process.env.ELASTICSEARCH_URL,
    });

    this.logger = pino(
      {
        base: {
          method,
          service,
        },
      },
      streamToElastic
    );
  }

  info(message: string, ...args: any[]) {
    this.logger.info(message, ...args);
  }

  error(message: string, ...args: any[]) {
    this.logger.error(message, ...args);
  }

  warn(message: string, ...args: any[]) {
    this.logger.warn(message, ...args);
  }
}
