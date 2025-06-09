import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Define o tipo do documento completo da empresa com o tipo Document do Mongoose
// Este tipo é exportado para ser usado em outras partes da aplicação, como no service.
export type CompanyDocument = Company & Document;

// Decorador para definir esta classe como um schema do Mongoose
// A classe Company também é exportada para ser usada como tipo no service e no model.
@Schema()
export class Company {
  // Propriedade 'name' da empresa
  @Prop({ required: true })
  name: string;

  // Propriedade 'document' (CNPJ ou similar), deve ser único
  @Prop({ required: true, unique: true })
  document: string;

  // Propriedade 'address' (opcional)
  @Prop()
  address: string;

  // Propriedade 'isActive' com valor padrão 'true'
  @Prop({ default: true })
  isActive: boolean;
}

// Cria e exporta o Schema do Mongoose a partir da classe Company
// Este schema é exportado para ser registrado no MongooseModule do CompaniesModule.
export const CompanySchema = SchemaFactory.createForClass(Company);