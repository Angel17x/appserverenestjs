import { IsNumber, Min } from "class-validator";
import { Type } from 'class-transformer';

export class PaginateDto {
  @Type(() => Number) // Asegura que el valor se transforme a número
  @IsNumber()
  @Min(1)
  page: number = 1;

  @Type(() => Number) // Asegura que el valor se transforme a número
  @IsNumber()
  @Min(1)
  limit: number = 20;
}