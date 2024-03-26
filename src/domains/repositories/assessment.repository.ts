import { PaginateDto } from "src/applications/dto/paginate.dto"
import { Assessment } from "../entities/assessment.entity"
import { AssessmentDto } from "src/applications/dto/assessment.dto"

export interface AssessmentRepository {
  find(entity: AssessmentDto): Promise<Assessment>
  findAll(paginate: PaginateDto): Promise<[Assessment[], number]>
  findById(id: any): Promise<Assessment>
  create(entity: AssessmentDto): Promise<Assessment>
  updateAt(id:any, entity: AssessmentDto): Promise<any>
  delete(id:any): Promise<boolean>
  isExists(name: string, lastname: string): Promise<boolean>
}