import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import { LoggerPino } from "@infrastructure/logger/logger.pino";
import { QueueAmqpService } from "@infrastructure/services/amqp.queue";
import { DoctorGateway } from "@infrastructure/gateways/doctor.gateway";
import { AxiosHttpService } from "@infrastructure/services/axios.http";
import { PatientGateway } from "@infrastructure/gateways/patient.gateway";
import { DatabaseService } from "@infrastructure/database/prisma/prisma.service";
import { HttpErrorHandler } from "@application/error/handlers/http-error.handler";
import { ScheduleConsultationDto } from "@application/dto/schedule-consultation.dto";
import { ScheduleConsultationUseCase } from "@core/use_cases/schedule-consultation.use-case";
import { ConsultationPrismaRepository } from "@infrastructure/database/repositories/consultation.prisma.repository";

const fastify = Fastify();

fastify.register(cors);
fastify.register(helmet);

fastify.setErrorHandler((error, _request, reply) => {
  const result = new HttpErrorHandler().handle(error);

  reply.status(result.statusCode).send(result);
});

const scheduleConsultationUseCase = new ScheduleConsultationUseCase(
  new LoggerPino("consultations", ScheduleConsultationUseCase.name),
  new QueueAmqpService(),
  new DoctorGateway(new AxiosHttpService()),
  new PatientGateway(new AxiosHttpService()),
  new ConsultationPrismaRepository(new DatabaseService())
);

fastify.post("/consultations/schedule", async (req, res) => {
  const { id } = await scheduleConsultationUseCase.execute(
    new ScheduleConsultationDto(req.body)
  );
  res.status(201).send({ id });
});

fastify.listen({ port: Number(process.env.PORT) || 3000, host: "0.0.0.0" });

console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
