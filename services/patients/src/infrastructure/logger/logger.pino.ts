import pino from "pino";
import pinoElastic from "pino-elasticsearch";
import { ILogger } from "@core/interfaces/logger.interface";

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

  // TODO: Send extra data to ElasticSearch
  info(message: string) {
    this.logger.info(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }
}
