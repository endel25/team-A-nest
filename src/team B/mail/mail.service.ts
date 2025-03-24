import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'minimilitia1491@gmail.com',
        pass: 'haettvpiejqojvyk',   // Use environment variables
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendAppointmentEmail(visitorEmail: string, date: string, allocatedTime: string) {
    const formLink = `http://localhost:3000/form?date=${date}&time=${allocatedTime}&email=${visitorEmail}`;

    await this.transporter.sendMail({
      from: `"Endel Digital" <minimilitia1491@gmail.com>`,
      to: visitorEmail,
      subject: 'Your Appointment Details',
      html: `<p>Your appointment is scheduled for <strong>${date}</strong> at <strong>${allocatedTime}</strong>.</p>
             <p>Click <a href="${formLink}">here</a> to complete your details.</p>`,
    });
  }
}
