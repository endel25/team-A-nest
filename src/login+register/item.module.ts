// item.module.ts (create this if you don't have it)
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { ItemController } from './item.controller';
import { MailModule } from '../mail/mail.module';
import { ItemService } from './item.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item]), // Add MailModule here
    MailModule,
  ],
  providers: [ItemService],
  controllers: [ItemController],
})
export class ItemModule {}