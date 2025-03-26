import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DriversModule } from './drivers/drivers.module';
import { PassengersModule } from './passengers/passengers.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { ViolationsModule } from './violations/violations.module';
import { CoopModule } from './coop/coop.module';
import { ArticlesModule } from './articles/articles.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'root',
      database: process.env.DB_NAME || 'transport_db',
      autoLoadEntities: true,
      synchronize: true, 
    }),
    AuthModule,
    DriversModule,
    PassengersModule,
    FeedbacksModule,
    ViolationsModule,
    CoopModule,
    ArticlesModule,
 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
