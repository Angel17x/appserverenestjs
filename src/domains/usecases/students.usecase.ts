import { Catch, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { UsersRepositoryImpl } from "src/infrastructures/repositories/users.repository.impl";
import { StudentRepositoryImpl } from "src/infrastructures/repositories/student.repository.impl";
import { Student } from "../entities/student.entity";
import { StudentDto } from "src/applications/dto/student.dto";

@Injectable()
@Catch(HttpException)
export class StudentUseCase {
  constructor(
    private readonly userRepository: UsersRepositoryImpl,
    private readonly studentRepository: StudentRepositoryImpl,
  ) { }

  async findAll(): Promise<Student[]> {
    try {
      const repoStudent = await this.studentRepository.findAll();
      return repoStudent;

    } catch (error) {
      if (!error) throw new HttpException('Error al obtener los estudiantes', HttpStatus.INTERNAL_SERVER_ERROR);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);

    }
  }

  async findById(id: UUID): Promise<Student> {
    try {
      if (!id) throw new HttpException('ID not found', HttpStatus.BAD_REQUEST);
      const repoStudent = await this.studentRepository.findById(id);
      return repoStudent;
    } catch (error) {
      if (!error) throw new HttpException('Error al obtener el estudiante', HttpStatus.INTERNAL_SERVER_ERROR);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(teacher: StudentDto): Promise<Student> {
    try {
      const isExistsStudent = await this.studentRepository.isExists(teacher.name, teacher.lastname);
      if (isExistsStudent) throw new HttpException('El profesor ya existe', HttpStatus.BAD_REQUEST);
      const repoUser = await this.userRepository.findById(teacher.userId);
      if (!repoUser) throw new HttpException('Este ID de usuario no existe', HttpStatus.BAD_REQUEST);
      const newStudent = await this.studentRepository.create(
        {
          name: teacher.name,
          lastname: teacher.lastname,
          address: teacher.address,
          phone: teacher.phone,
          userId: repoUser
        }
      );
      return newStudent;

    } catch (error) {
      if (!error) throw new HttpException('Error al crear el estudiante', HttpStatus.INTERNAL_SERVER_ERROR);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: UUID, teacher: StudentDto): Promise<boolean> {
    try {
      const teacherUpdated = await this.studentRepository.updateAt(
        id,
        {
          name: teacher.name,
          lastname: teacher.lastname,
          address: teacher.address,
          phone: teacher.phone,
          userId: teacher.userId
        }
      );
      if (!teacherUpdated) throw new HttpException('Error al actualizar el estudiante', HttpStatus.INTERNAL_SERVER_ERROR)
      return teacherUpdated;

    } catch (error) {
      if (!error) throw new HttpException('Error al actualizar el estudiante', HttpStatus.INTERNAL_SERVER_ERROR);
      if (error.name === 'QueryFailedError') throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: UUID): Promise<boolean> {
    try {
      const userDeleted = await this.studentRepository.delete(id);
      if (!userDeleted) throw new HttpException(`'El ID del estudiante que estas intentando eliminar no existe`, HttpStatus.NOT_FOUND)
      return userDeleted;
    } catch (error) {
      if (!error) throw new HttpException('Error al eliminar el estudiante', HttpStatus.INTERNAL_SERVER_ERROR);
      if (error.name === 'QueryFailedError') throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}