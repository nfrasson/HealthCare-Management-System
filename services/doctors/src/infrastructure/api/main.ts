import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import { LoggerPino } from "@infrastructure/logger/logger.pino";
import { QueueAmqpService } from "@infrastructure/services/queue.amqp";
import { RegisterDoctorDto } from "@application/dto/register-doctor.dto";
import { DatabaseService } from "@infrastructure/database/prisma/prisma.service";
import { DoctorPrismaRepository } from "@infrastructure/database/repositories/doctor.prisma.repository";
import {
  RegisterDoctorUseCase,
  DoctorExistsByIdUseCase,
} from "@core/use_cases";
import { DoctorExistsByIdDto } from "@application/dto";
import { HttpErrorHandler } from "@application/error/handlers/http-error.handler";
import { DoctorHasSpecialtyUseCase } from "@core/use_cases/has-specialty.use-case";
import { DoctorHasSpecialtyDto } from "@application/dto/has-specialty.dto";

const fastify = Fastify();

fastify.register(cors);
fastify.register(helmet);

fastify.setErrorHandler((error, _request, reply) => {
  const result = new HttpErrorHandler().handle(error);

  reply.status(result.statusCode).send(result);
});

const registerDoctorUseCase = new RegisterDoctorUseCase(
  new LoggerPino("doctors", RegisterDoctorUseCase.name),
  new QueueAmqpService(),
  new DoctorPrismaRepository(new DatabaseService())
);

const doctorExistsByIdUseCase = new DoctorExistsByIdUseCase(
  new DoctorPrismaRepository(new DatabaseService())
);

const doctorHasSpecialtyUseCase = new DoctorHasSpecialtyUseCase(
  new DoctorPrismaRepository(new DatabaseService())
);

fastify.post("/doctors/register", async (req, res) => {
  const { id } = await registerDoctorUseCase.execute(
    new RegisterDoctorDto(req.body)
  );
  res.status(201).send({ id });
});

fastify.get("/doctors/:doctorId/exists", async (req, res) => {
  await doctorExistsByIdUseCase.execute(new DoctorExistsByIdDto(req.params));
  res.status(204).send();
});

fastify.get("/doctors/:doctorId/specialties/:specialty", async (req, res) => {
  const hasSpecialty = await doctorHasSpecialtyUseCase.execute(
    new DoctorHasSpecialtyDto(req.params)
  );

  res.status(200).send({ hasSpecialty });
});

fastify.listen({ port: Number(process.env.PORT) || 3000, host: "0.0.0.0" });

console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
