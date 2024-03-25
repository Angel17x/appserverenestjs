import { TeacherDto } from "src/applications/dto/teacher.dto"
import { Teacher } from "../entities/teacher.entity"
import { GenericRepository } from "./generic.repository"
import { PaginateDto } from "../../applications/dto/paginate.dto"

export interface TeacherRepository {
  find(entity: TeacherDto): Promise<Teacher>
  findAll(paginated: PaginateDto): Promise<[Teacher[], number]>
  findById(id: any): Promise<Teacher>
  create(entity: TeacherDto): Promise<Teacher>
  updateAt(id:any, entity: TeacherDto): Promise<any>
  delete(id:any): Promise<boolean>
  isExists(name: string, lastname: string): Promise<boolean>
  isExistsUserId(userId: string): Promise<boolean> 
}