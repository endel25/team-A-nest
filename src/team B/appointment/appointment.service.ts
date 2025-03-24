import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { MailService } from '../mail/mail.service'; // Import MailService

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    private readonly mailService: MailService // Inject MailService
  ) {}

  async createAppointment(visitorEmail: string, date: string, allocatedTime: string) {
    const newAppointment = this.appointmentRepository.create({ visitorEmail, date, allocatedTime });
    await this.appointmentRepository.save(newAppointment);

    // ✅ Send Email after saving the appointment
    await this.mailService.sendAppointmentEmail(visitorEmail, date, allocatedTime);
    
    return newAppointment;
  }
}
