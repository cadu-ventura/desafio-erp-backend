import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // Importe estes dois

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // --- CONFIGURAÇÃO DO SWAGGER ---
  const config = new DocumentBuilder()
    .setTitle('API de Gerenciamento de Empresas') // Título da sua API
    .setDescription('API para operações CRUD de empresas no sistema ERP') // Descrição
    .setVersion('1.0') // Versão da API
    // .addTag('companies') // Opcional: Adicione tags para organizar endpoints
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 'api' é o caminho para acessar a documentação (ex: http://localhost:3000/api)
  // --- FIM DA CONFIGURAÇÃO DO SWAGGER ---

  await app.listen(3000);
}
bootstrap();