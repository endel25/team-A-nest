import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import * as QRCode from "qrcode";
import { Visitor } from "./visitor.entity";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class VisitorMailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'minimilitia1491@gmail.com',
          pass: 'haettvpiejqojvyk',  
      },
    });
  }

  async sendVisitorQRCode(visitor: Visitor): Promise<void> {
    try {
      // Ensure all visitor details are available
      const name = visitor.firstName ? visitor.firstName + " " + (visitor.lastName || "") : "Unknown";
      const email = visitor.email || "No Email Provided";
      const phone = visitor.phoneNumber || "No Phone Provided";
      const date = visitor.date || "No Date Provided";
      const time = visitor.allocationTime || "No Time Provided";

      // Generate QR code data
      const qrData = JSON.stringify({ name, email, phone, date, time });

      // Generate QR code as a buffer
      const qrCodeBuffer = await QRCode.toBuffer(qrData);

      // Define file path to store QR code temporarily
      const qrCodeFilePath = path.join(__dirname, `visitor-${visitor.id}.png`);

      // Save the QR code as a temporary file
      fs.writeFileSync(qrCodeFilePath, qrCodeBuffer);

      const mailOptions = {
        from: 'minimilitia1491@gmail.com',
        to: visitor.email,
        subject: 'Your Visitor QR Code',
        html: `
          <p>Hello ${visitor.firstName},</p>
          <p>Thank you for registering as a visitor. Attached is your QR code containing your details.</p>
          <p>Please bring this QR code to your appointment.</p>
          <p>Best Regards,<br>Your Company</p>
        `,
        attachments: [
          {
            filename: `Visitor_QR_${visitor.id}.png`,
            path: qrCodeFilePath,
            contentType: 'image/png',
          },
        ],
      };

      await this.transporter.sendMail(mailOptions);
      console.log(`QR code email successfully sent to ${visitor.email}`);

      // Delete the temporary QR code file after sending
      fs.unlinkSync(qrCodeFilePath);
    } catch (error) {
      console.error("Failed to send QR code email:", error);
    }
  }
}
