import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './login+register/item.module';
import { AuthModule } from './login+register/auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import * as https from 'https';
import { MailModule } from './mail/mail.module';
import { VisitorModule } from './team A/employee_sends_visitor_data/visitor.module';


@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'endel@123',
      database: 'CURD',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Ensure entities are loaded
      autoLoadEntities: true,
      synchronize: true,
    }),
    ItemModule,
    AuthModule,
    MailModule,
    VisitorModule,
    
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
