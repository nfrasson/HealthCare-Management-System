import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import { RegisterPatientDto } from "@application/dto/register-patient.dto";
import { DatabaseService } from "@infrastructure/database/prisma/prisma.service";
import { RegisterPatientUseCase } from "@core/use_cases/register-patient.use-case";
import { PatientPrismaRepository } from "@infrastructure/database/repositories/patient.prisma.repository";
import { LoggerPino } from "@infrastructure/logger/logger.pino";
import { QueueAmqpService } from "@infrastructure/services/queue.amqp";
import { IQueueService } from "@core/interfaces/services/queue.interface";

const fastify = Fastify();

fastify.register(cors);
fastify.register(helmet);

fastify.setErrorHandler((error, _request, reply) => {
  console.error(error);
  reply.status(500).send(error);
});

const queueService: IQueueService = new QueueAmqpService();

const registerPatientUseCase = new RegisterPatientUseCase(
  new LoggerPino("patients", RegisterPatientUseCase.name),
  queueService,
  new PatientPrismaRepository(new DatabaseService())
);

fastify.post("/patients/register", async (req, res) => {
  await registerPatientUseCase.execute(new RegisterPatientDto(req.body));
  res.status(201).send();
});

fastify.listen({ port: Number(process.env.PORT) || 3000, host: "0.0.0.0" });

console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
