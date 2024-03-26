import { Catch, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { UsersRepositoryImpl } from "src/infrastructures/repositories/users.repository.impl";
import { StudentRepositoryImpl } from "src/infrastructures/repositories/student.repository.impl";
import { Student } from "../entities/student.entity";
import { StudentDto } from "src/applications/dto/student.dto";
import { PaginateDto } from "src/applications/dto/paginate.dto";
import { PaginateResponse } from "../entities/generic.paginate.entity";
import { TeacherRepositoryImpl } from "src/infrastructures/repositories/teacher.repository.impl";
import { RegisterStudentDto } from "src/applications/dto/register-student.dto";
import { Role } from "src/applications/enums/role.enum";
import { UpdateStudentDto } from "src/applications/dto/update-student.dto";

@Injectable()
@Catch(HttpException)
export class StudentUseCase {
  constructor(
    private readonly userRepository: UsersRepositoryImpl,
    private readonly studentRepository: StudentRepositoryImpl,
    private readonly teacherRepository: TeacherRepositoryImpl
  ) { }

  async findAll(paginate: PaginateDto): Promise<PaginateResponse<Student>> {
    try {
      const paginateDefault = {
        page: !isNaN(paginate.page) && paginate.page > 0 ? paginate.page : 1,
        limit: !isNaN(paginate.limit) && paginate.limit > 0 ? paginate.limit : 20,
      };
      const [data, total] = await this.studentRepository.findAll(paginateDefault);
      const totalPages = Math.ceil(total / paginateDefault.limit); // Usar paginateDefault.limit

      return { status: HttpStatus.OK, data: data, total: total, totalPages, ...paginateDefault };

    } catch (error) {
      if (!error) throw new HttpException('Error al obtener los estudiantes', HttpStatus.INTERNAL_SERVER_ERROR);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);

    }
  }

  async findById(id: UUID): Promise<Student> {
    try {
      if (!id) throw new HttpException('ID query not provided', HttpStatus.BAD_REQUEST);
      const repoStudent = await this.studentRepository.findById(id);
      if (!repoStudent) throw new HttpException('ID not found', HttpStatus.NOT_FOUND);
      return repoStudent;
    } catch (error) {
      if (!error) throw new HttpException('Error al obtener el estudiante', HttpStatus.INTERNAL_SERVER_ERROR);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(student: RegisterStudentDto): Promise<Student> {
    try {
      const isExistsStudent = await this.studentRepository.isExists(student.name, student.lastname);
      if (isExistsStudent) throw new HttpException('El estudiante ya existe', HttpStatus.BAD_REQUEST);
      const isExistsTeacher = await this.teacherRepository.isExistsUserId(student.userId);
      if (isExistsTeacher) throw new HttpException('Este ID de usuario pertenece a un profesor', HttpStatus.BAD_REQUEST);
      const repoUser = await this.userRepository.findById(student.userId);
      if (!repoUser) throw new HttpException('Este ID de usuario no existe', HttpStatus.BAD_REQUEST);
      if (repoUser.role !== Role.PEOPLE) throw new HttpException(`El ID del usuario no es un tipo role 'PEOPLE'`, HttpStatus.BAD_REQUEST);
      const newStudent = await this.studentRepository.create(
        {
          name: student.name,
          lastname: student.lastname,
          address: student.address,
          phone: student.phone,
          userId: repoUser
        }
      );
      return newStudent;

    } catch (error) {
      if (!error) throw new HttpException('Error al crear el estudiante', HttpStatus.INTERNAL_SERVER_ERROR);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: UUID, student: UpdateStudentDto): Promise<boolean> {
    try {
      if (!id) throw new HttpException('ID query not provided', HttpStatus.BAD_REQUEST)
      const studentUpdated = await this.studentRepository.updateAt(
        id, { name: student.name, lastname: student.lastname, address: student.address, phone: student.phone });
      if (!studentUpdated) throw new HttpException('Error al actualizar el estudiante', HttpStatus.INTERNAL_SERVER_ERROR)
      return studentUpdated;

    } catch (error) {
      if (!error) throw new HttpException('Error al actualizar el estudiante', HttpStatus.INTERNAL_SERVER_ERROR);
      if (error.name === 'QueryFailedError') throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: UUID): Promise<boolean> {
    try {
      if (!id) throw new HttpException('ID not found', HttpStatus.BAD_REQUEST);
      const userDeleted = await this.studentRepository.delete(id);
      if (!userDeleted) throw new HttpException(`'El ID del estudiante que estas intentando eliminar no existe`, HttpStatus.NOT_FOUND)
      return userDeleted;
    } catch (error) {
      console.log(error);
      if (!error) throw new HttpException('Error al eliminar el estudiante', HttpStatus.INTERNAL_SERVER_ERROR);
      if (error.name === 'QueryFailedError') throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}