// item.module.ts (create this if you don't have it)
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visitor } from './visitor.entity';
import { VisitorService } from './visitor.service';
import { VisitorController } from './visitor.controller';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Visitor]), // Add MailModule here
    MailModule,
  ],
  providers: [VisitorService],
  controllers: [VisitorController],
})
export class VisitorModule {}