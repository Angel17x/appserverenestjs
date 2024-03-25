import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { BinnacleRepository } from "src/domains/repositories/binnacle.repository";
import { Binnacle } from "src/domains/entities/binnacle.entity";

@Injectable()
export class BinnacleRepositoryImpl implements BinnacleRepository {
  constructor(
    @InjectRepository(Binnacle)
    private readonly binnacleRepository: Repository<Binnacle>) { }
  findAll(): Promise<Binnacle[]> {
    throw new Error("Method not implemented.");
  }
  findById(id: any): Promise<Binnacle> {
    throw new Error("Method not implemented.");
  }
  create(entity: Binnacle): Promise<Binnacle> {
    throw new Error("Method not implemented.");
  }
  updateAt(id: any, entity: Binnacle): Promise<any> {
    throw new Error("Method not implemented.");
  }
  delete(id: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  find(model: Binnacle): Promise<Binnacle> {
    throw new Error("Method not implemented.");
  }
  
}