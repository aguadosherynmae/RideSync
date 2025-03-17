import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // Enable CORS for development (allow all origins)
    app.enableCors({
      origin: '', // Use '' for dev; replace with specific IP (e.g., 'http://192.168.155.x'/) in production
      methods: 'GET,POST,PUT,PATCH,DELETE', // Broader method support
      credentials: true, // Optional: keep if you plan to use cookies or auth headers
    });

    // Global validation pipe for DTOs
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // Strip unknown properties
        forbidNonWhitelisted: true, // Throw errors for non-whitelisted properties
      }),
    );

    // Listen on all interfaces (0.0.0.0) for network access
    const port = 3000;
    await app.listen(port, '0.0.0.0');
    console.log(`Server running on http://0.0.0.0:${port}`);
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
}

bootstrap();