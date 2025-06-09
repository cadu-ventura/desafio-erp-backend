import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Opcional, para documentação da API

// Para validação, precisamos instalar class-validator e class-transformer:
// npm install class-validator class-transformer

export class CreateCompanyDto {
  @ApiProperty({ description: 'Nome da empresa', example: 'Minha Empresa S.A.' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Número do documento (CNPJ/CPF)', example: '12.345.678/0001-90' })
  @IsString()
  @IsNotEmpty()
  document: string;

  @ApiProperty({ description: 'Endereço completo da empresa', example: 'Rua Exemplo, 123, Bairro, Cidade' })
  @IsString()
  @IsOptional() // Opcional para criação
  address?: string; // O '?' indica que o campo é opcional

  @ApiProperty({ description: 'Status de atividade da empresa', default: true })
  @IsBoolean()
  @IsOptional() // Opcional para criação, pois temos um default no schema
  isActive?: boolean;
}