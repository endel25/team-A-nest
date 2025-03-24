import { Controller, Post, Body, Logger } from '@nestjs/common';
import { AppointmentService } from './appointment.service';

@Controller('appointment')
export class AppointmentController {
  private readonly logger = new Logger(AppointmentController.name);

  constructor(
    private readonly appointmentService: AppointmentService, // ✅ Only inject AppointmentService
  ) {}

  @Post('create')
  async createAppointment(@Body() body: { visitorEmail: string; date: string; allocatedTime: string }) {
    this.logger.log(`Received request: ${JSON.stringify(body)}`); // ✅ Logs incoming request

    const appointment = await this.appointmentService.createAppointment(
      body.visitorEmail,
      body.date,
      body.allocatedTime,
    );

    this.logger.log(`Appointment created for: ${body.visitorEmail}`); // ✅ Logs successful creation

    return { message: 'Appointment created and email sent successfully', appointment };
  }
}
