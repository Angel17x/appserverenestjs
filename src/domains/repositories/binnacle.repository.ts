import { Binnacle } from "../entities/binnacle.entity";
import { GenericRepository } from "./generic.repository";

export interface BinnacleRepository extends GenericRepository<Binnacle>{
  findAll(): Promise<Binnacle[]>
  findById(id: any): Promise<Binnacle>
  create(entity: Binnacle): Promise<Binnacle>
  updateAt(id:any, entity: Binnacle): Promise<any>
  delete(id: any): Promise<boolean>
}