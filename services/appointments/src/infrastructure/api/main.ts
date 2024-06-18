import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import { LoggerPino } from "@infrastructure/logger/logger.pino";
import { QueueAmqpService } from "@infrastructure/services/amqp.queue";
import { ScheduleAppointmentDto } from "@application/dto/schedule-appointment.dto";
import { DatabaseService } from "@infrastructure/database/prisma/prisma.service";
import { ScheduleAppointmentUseCase } from "@core/use_cases/schedule-appointment.use-case";
import { AppointmentPrismaRepository } from "@infrastructure/database/repositories/appointment.prisma.repository";
import { DoctorGateway } from "@infrastructure/gateways/doctor.gateway";
import { AxiosHttpService } from "@infrastructure/services/axios.http";
import { PatientGateway } from "@infrastructure/gateways/patient.gateway";

const fastify = Fastify();

fastify.register(cors);
fastify.register(helmet);

fastify.setErrorHandler((error, _request, reply) => {
  console.error(error);
  reply.status(500).send(error);
});

const scheduleAppointmentUseCase = new ScheduleAppointmentUseCase(
  new LoggerPino("appointments", ScheduleAppointmentUseCase.name),
  new QueueAmqpService(),
  new DoctorGateway(new AxiosHttpService()),
  new PatientGateway(new AxiosHttpService()),
  new AppointmentPrismaRepository(new DatabaseService())
);

fastify.post("/appointments/schedule", async (req, res) => {
  await scheduleAppointmentUseCase.execute(
    new ScheduleAppointmentDto(req.body)
  );
  res.status(201).send();
});

fastify.listen({ port: Number(process.env.PORT) || 3000, host: "0.0.0.0" });

console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
