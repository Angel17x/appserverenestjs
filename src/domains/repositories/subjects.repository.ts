import { PaginateDto } from "src/applications/dto/paginate.dto"
import { SubjectDto } from "src/applications/dto/subject.dto"
import { Subject } from "../entities/entities"

export interface SubjectRepository {
  find(entity: SubjectDto): Promise<Subject>
  findAll(paginate: PaginateDto): Promise<[Subject[], number]>
  findById(id: any): Promise<Subject>
  create(entity: SubjectDto): Promise<Subject>
  updateAt(id:any, entity: SubjectDto): Promise<any>
  delete(id:any): Promise<boolean>
  isExists(name: string, lastname: string): Promise<boolean>
}