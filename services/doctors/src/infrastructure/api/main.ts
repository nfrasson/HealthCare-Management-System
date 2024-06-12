import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import { LoggerPino } from "@infrastructure/logger/logger.pino";
import { QueueAmqpService } from "@infrastructure/services/queue.amqp";
import { RegisterDoctorDto } from "@application/dto/register-doctor.dto";
import { DatabaseService } from "@infrastructure/database/prisma/prisma.service";
import { RegisterDoctorUseCase } from "@core/use_cases/register-doctor.use-case";
import { DoctorPrismaRepository } from "@infrastructure/database/repositories/doctor.prisma.repository";

const fastify = Fastify();

fastify.register(cors);
fastify.register(helmet);

fastify.setErrorHandler((error, _request, reply) => {
  console.error(error);
  reply.status(500).send(error);
});

const registerDoctorUseCase = new RegisterDoctorUseCase(
  new LoggerPino("doctors", RegisterDoctorUseCase.name),
  new QueueAmqpService(),
  new DoctorPrismaRepository(new DatabaseService())
);

fastify.post("/doctors/register", async (req, res) => {
  await registerDoctorUseCase.execute(new RegisterDoctorDto(req.body));
  res.status(201).send();
});

fastify.listen({ port: Number(process.env.PORT) || 3000, host: "0.0.0.0" });

console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
