import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Importe MongooseModule
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { Company, CompanySchema } from '../repositories/company.schema'; // Importe o Company e CompanySchema

@Module({
  imports: [
    // ESTA LINHA É QUEM FORNECE O CompanyModel PARA INJEÇÃO NO CompaniesService
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
  ],
  providers: [CompaniesService],
  controllers: [CompaniesController],
})
export class CompaniesModule {}