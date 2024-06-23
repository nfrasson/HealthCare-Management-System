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
import { ScheduleAppointmentDto } from "@application/dto/schedule-appointment.dto";
import { ScheduleAppointmentUseCase } from "@core/use_cases/schedule-appointment.use-case";
import { AppointmentPrismaRepository } from "@infrastructure/database/repositories/appointment.prisma.repository";

const fastify = Fastify();

fastify.register(cors);
fastify.register(helmet);

fastify.setErrorHandler((error, _request, reply) => {
  const result = new HttpErrorHandler().handle(error);

  reply.status(result.statusCode).send(result);
});

const scheduleAppointmentUseCase = new ScheduleAppointmentUseCase(
  new LoggerPino("appointments", ScheduleAppointmentUseCase.name),
  new QueueAmqpService(),
  new DoctorGateway(new AxiosHttpService()),
  new PatientGateway(new AxiosHttpService()),
  new AppointmentPrismaRepository(new DatabaseService())
);

fastify.post("/appointments/schedule", async (req, res) => {
  const { id } = await scheduleAppointmentUseCase.execute(
    new ScheduleAppointmentDto(req.body)
  );
  res.status(201).send({ id });
});

fastify.listen({ port: Number(process.env.PORT) || 3000, host: "0.0.0.0" });

console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
