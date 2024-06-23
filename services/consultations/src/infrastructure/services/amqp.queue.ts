import amqp, { Connection, Channel } from "amqplib";
import { IQueueService } from "@core/interfaces/services/queue.interface";

export class QueueAmqpService implements IQueueService {
  private channel: Channel;
  private connection: Connection;

  constructor() {
    this.initialize();
  }

  async initialize(retries = 5, delay = 5000): Promise<void> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        this.connection = await amqp.connect(
          process.env.RABBITMQ_URL || "amqp://localhost"
        );
        this.channel = await this.connection.createChannel();
        console.log("Connected to RabbitMQ");
        return;
      } catch (error) {
        if (attempt < retries) {
          console.log(
            `Failed to connect to RabbitMQ, retrying in ${
              delay / 1000
            } seconds... (${attempt}/${retries})`
          );
          await this.delay(delay);
        } else {
          console.error(
            "Failed to connect to RabbitMQ after multiple attempts",
            error
          );
          throw error;
        }
      }
    }
  }

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async assertQueue(queueName: string): Promise<void> {
    await this.channel.assertQueue(queueName, { durable: true });
  }

  async produce(queueName: string, message: object): Promise<void> {
    await this.assertQueue(queueName);

    this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });
  }

  async setQueueConsumer(
    queueName: string,
    callback: (message: object) => Promise<void>
  ): Promise<void> {
    await this.assertQueue(queueName);

    this.channel.consume(queueName, async (message) => {
      try {
        await callback(JSON.parse(message.content.toString()));
        this.channel.ack(message);
      } catch (error) {
        this.channel.nack(message);
      }
    });
  }
}
