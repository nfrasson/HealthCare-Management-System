import { LoggerPino } from "@infrastructure/logger/logger.pino";
import { QueueAmqpService } from "@infrastructure/services/queue.amqp";
import { IQueueService } from "@core/interfaces/services/queue.interface";
import { PatientRegisteredUseCase } from "@core/use_cases/patient-registered.use-case";

const queueService: IQueueService = new QueueAmqpService();
const patientRegisteredUseCase = new PatientRegisteredUseCase(
  new LoggerPino(PatientRegisteredUseCase.name, "execute")
);

const start = async () => {
  console.log("Starting queue service...");
  await queueService.initialize();

  queueService.setQueueConsumer("patient_registered", async (message) => {
    patientRegisteredUseCase.execute(message);
  });

  console.log("Queue service started");
};

start();
