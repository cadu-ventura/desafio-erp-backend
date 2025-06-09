 import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Importe MongooseModule
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importe ConfigModule e ConfigService

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './companies/companies.module'; // Importe CompaniesModule

@Module({
  imports: [
    // 1. Configura o ConfigModule para carregar variáveis de ambiente do .env.
    //    'isGlobal: true' torna as variáveis de ambiente disponíveis em toda a aplicação.
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // Opcional: Define explicitamente o caminho para o .env
    }),
    // 2. Configura o MongooseModule para conexão com o MongoDB.
    //    Usamos 'forRootAsync' porque precisamos injetar 'ConfigService' para ler a URI.
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Precisa importar ConfigModule para usar ConfigService aqui
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'), // Obtém a URI 'MONGODB_URI' do .env
      }),
      inject: [ConfigService], // Diz ao NestJS para injetar ConfigService
    }),
    // 3. Importa o CompaniesModule, que agora gerencia o CompanySchema e a lógica de empresas.
    CompaniesModule,
    // A linha 'MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),'
    // FOI REMOVIDA DAQUI, pois foi movida para dentro de CompaniesModule.
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}