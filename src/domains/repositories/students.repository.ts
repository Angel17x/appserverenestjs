import { StudentDto } from "src/applications/dto/student.dto"
import { Student } from "../entities/student.entity"
import { GenericRepository } from "./generic.repository"
import { PaginateDto } from "src/applications/dto/paginate.dto"
import { UpdateStudentDto } from "src/applications/dto/update-student.dto"

export interface StudentRepository{
  find(entity: StudentDto): Promise<Student>
  findAll(paginate: PaginateDto): Promise<[Student[], number]>
  findById(id: any): Promise<Student>
  create(entity: StudentDto): Promise<Student>
  updateAt(id:any, entity: UpdateStudentDto): Promise<any>
  delete(id:any): Promise<boolean>
  isExists(name: string, lastname: string): Promise<boolean>
}