import {
  Controller,          // Decorador para definir um controlador
  Get,                 // Decorador para rotas GET
  Post,                // Decorador para rotas POST
  Body,                // Decorador para extrair o corpo da requisição
  Patch,               // Decorador para rotas PATCH (atualização parcial)
  Param,               // Decorador para extrair parâmetros da URL (ex: :id)
  Delete,              // Decorador para rotas DELETE
  HttpCode,            // Decorador para definir o código de status HTTP da resposta
  HttpStatus,          // Enum para códigos de status HTTP (ex: HttpStatus.CREATED)
} from '@nestjs/common';
import { CompaniesService } from './companies.service'; // Importa o serviço de empresas
import { CreateCompanyDto } from '../dto/create-company.dto'; // Importa o DTO para criação
import { UpdateCompanyDto } from '../dto/update-company.dto'; // Importa o DTO para atualização
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger'; // Imports para documentação Swagger

@ApiTags('companies') // Tag para agrupar este controlador no Swagger UI (aparecerá como "companies")
@Controller('companies') // Define o prefixo da rota para todas as rotas neste controlador (ex: /companies)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // Define o código de status HTTP 201 (Created) para sucesso
  @ApiOperation({ summary: 'Cria uma nova empresa' }) // Descrição da operação no Swagger
  @ApiResponse({ status: 201, description: 'Empresa criada com sucesso.' }) // Resposta esperada no Swagger
  @ApiResponse({ status: 400, description: 'Dados inválidos.' }) // Possível erro no Swagger
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    // Recebe o corpo da requisição e o passa para o serviço
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK) // Define o código de status HTTP 200 (OK) para sucesso
  @ApiOperation({ summary: 'Lista todas as empresas' })
  @ApiResponse({ status: 200, description: 'Lista de empresas retornada com sucesso.' })
  async findAll() {
    // Chama o serviço para buscar todas as empresas
    return this.companiesService.findAll();
  }

  @Get(':id') // Define uma rota GET com um parâmetro dinâmico ':id'
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtém uma empresa pelo ID' })
  @ApiResponse({ status: 200, description: 'Empresa encontrada e retornada.' })
  @ApiResponse({ status: 404, description: 'Empresa não encontrada.' })
  async findOne(@Param('id') id: string) { // Extrai o ID da URL
    // Chama o serviço para buscar uma empresa pelo ID
    return this.companiesService.findOne(id);
  }

  @Patch(':id') // Define uma rota PATCH para atualização parcial com um parâmetro ':id'
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualiza uma empresa pelo ID' })
  @ApiResponse({ status: 200, description: 'Empresa atualizada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Empresa não encontrada para atualização.' })
  @ApiResponse({ status: 400, description: 'Dados de atualização inválidos.' })
  async update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    // Extrai o ID da URL e o corpo da requisição, passando-os para o serviço
    return this.companiesService.update(id, updateCompanyDto);
  }

  @Delete(':id') // Define uma rota DELETE para remover uma empresa com um parâmetro ':id'
  @HttpCode(HttpStatus.NO_CONTENT) // Define o código de status HTTP 204 (No Content) para sucesso
  @ApiOperation({ summary: 'Remove uma empresa pelo ID' })
  @ApiResponse({ status: 204, description: 'Empresa removida com sucesso.' })
  @ApiResponse({ status: 404, description: 'Empresa não encontrada para remoção.' })
  async remove(@Param('id') id: string) { // Extrai o ID da URL
    // Chama o serviço para remover a empresa
    await this.companiesService.remove(id);
    // Para 204 No Content, não há retorno de corpo na resposta.
  }
}