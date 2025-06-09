import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from '../repositories/company.schema'; // <-- VERIFIQUE ISSO!
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    // Isso injeta o "Model" de Mongoose para a sua Company, permitindo interagir com o DB
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  // MÉTODOS CRUD IMPLEMENTADOS

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const createdCompany = new this.companyModel(createCompanyDto);
    return createdCompany.save(); // Salva o novo documento no MongoDB
  }

  async findAll(): Promise<Company[]> {
    return this.companyModel.find().exec(); // Busca todos os documentos da coleção
  }

  async findOne(id: string): Promise<Company> {
    const company = await this.companyModel.findById(id).exec(); // Busca um documento pelo ID
    if (!company) {
      throw new NotFoundException(`Empresa com ID "${id}" não encontrada.`); // Lança exceção se não encontrar
    }
    return company;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    const existingCompany = await this.companyModel
      .findByIdAndUpdate(id, updateCompanyDto, { new: true }) // Atualiza e retorna o documento novo
      .exec();
    if (!existingCompany) {
      throw new NotFoundException(`Empresa com ID "${id}" não encontrada para atualização.`);
    }
    return existingCompany;
  }

  async remove(id: string): Promise<any> { // Pode retornar o documento removido ou um status
    const deletedCompany = await this.companyModel.findByIdAndDelete(id).exec();
    if (!deletedCompany) {
      throw new NotFoundException(`Empresa com ID "${id}" não encontrada para remoção.`);
    }
    return deletedCompany;
  }
}