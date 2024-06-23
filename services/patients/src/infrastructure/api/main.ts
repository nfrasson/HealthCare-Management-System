import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import { LoggerPino } from "@infrastructure/logger/logger.pino";
import { QueueAmqpService } from "@infrastructure/services/queue.amqp";
import { RegisterPatientDto } from "@application/dto/register-patient.dto";
import { DatabaseService } from "@infrastructure/database/prisma/prisma.service";
import { HttpErrorHandler } from "@application/error/handlers/http-error.handler";
import { RegisterPatientUseCase } from "@core/use_cases/register-patient.use-case";
import { PatientPrismaRepository } from "@infrastructure/database/repositories/patient.prisma.repository";
import { PatientExistsByIdUseCase } from "@core/use_cases";
import { PatientExistsByIdDto } from "@application/dto";

const fastify = Fastify();

fastify.register(cors);
fastify.register(helmet);

fastify.setErrorHandler((error, _request, reply) => {
  const result = new HttpErrorHandler().handle(error);

  reply.status(result.statusCode).send(result);
});

const registerPatientUseCase = new RegisterPatientUseCase(
  new LoggerPino("patients", RegisterPatientUseCase.name),
  new QueueAmqpService(),
  new PatientPrismaRepository(new DatabaseService())
);

const patientExistsByIdUseCase = new PatientExistsByIdUseCase(
  new PatientPrismaRepository(new DatabaseService())
);

fastify.post("/patients/register", async (req, res) => {
  const { id } = await registerPatientUseCase.execute(
    new RegisterPatientDto(req.body)
  );
  res.status(201).send({ id });
});

fastify.get("/patients/:patientId/exists", async (req, res) => {
  await patientExistsByIdUseCase.execute(new PatientExistsByIdDto(req.params));
  res.status(204).send();
});

fastify.listen({ port: Number(process.env.PORT) || 3000, host: "0.0.0.0" });

console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
