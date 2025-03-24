import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { MailModule } from '../mail/mail.module'; // ✅ Import MailModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]), 
    MailModule // ✅ Ensure MailModule is imported
  ],
  providers: [AppointmentService],
  controllers: [AppointmentController],
  exports: [AppointmentService],
})
export class AppointmentModule {}
