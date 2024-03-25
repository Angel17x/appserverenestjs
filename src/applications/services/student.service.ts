import { Student } from "src/domains/entities/student.entity"
import { StudentDto } from "../dto/student.dto"
import { UUID } from "crypto"

export interface StudentService {
  findAll(): Promise<Student[]>
  findById(id: UUID): Promise<Student>
  create(teacher: StudentDto): Promise<Student>
  updateAt(id:UUID, teacher: StudentDto): Promise<boolean>
  delete(id:UUID): Promise<boolean>
}