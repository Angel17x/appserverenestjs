import { StudentDto } from "src/applications/dto/student.dto"
import { Student } from "../entities/student.entity"
import { GenericRepository } from "./generic.repository"

export interface StudentRepository extends GenericRepository<Student>{
  find(entity: StudentDto): Promise<Student>
  findAll(): Promise<Student[]>
  findById(id: any): Promise<Student>
  create(entity: StudentDto): Promise<Student>
  updateAt(id:any, entity: StudentDto): Promise<any>
  delete(id:any): Promise<boolean>
  isExists(name: string, lastname: string): Promise<boolean>
}