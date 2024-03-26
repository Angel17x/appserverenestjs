import { Catch, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { Teacher } from "../entities/teacher.entity";
import { TeacherDto } from "src/applications/dto/teacher.dto";
import { UsersRepositoryImpl } from "src/infrastructures/repositories/users.repository.impl";
import { TeacherRepositoryImpl } from "src/infrastructures/repositories/teacher.repository.impl";
import { TeacherRegisterDto } from "src/applications/dto/register-teacher";
import { Role } from "src/applications/enums/role.enum";
import { PaginateDto } from "../../applications/dto/paginate.dto";
import { PaginateResponse } from "../entities/generic.paginate.entity";

@Injectable()
@Catch(HttpException)
export class TeacherUseCase {
  constructor(
    private readonly userRepository: UsersRepositoryImpl,
    private readonly teacherRepository: TeacherRepositoryImpl,
  ) { }

  async findAll(paginate: PaginateDto): Promise<PaginateResponse<Teacher>> {
    try {
      const paginateDefault = {
        page: !isNaN(paginate.page) && paginate.page > 0 ? paginate.page : 1,
        limit: !isNaN(paginate.limit) && paginate.limit > 0 ? paginate.limit : 20,
      };
      const [data, total] = await this.teacherRepository.findAll(paginateDefault);
      const totalPages = Math.ceil(total / paginateDefault.limit); // Usar paginateDefault.limit

      return { status: HttpStatus.OK, data: data, total: total, totalPages, ...paginateDefault };
    } catch (error) {
      const errorMessage = error.message || 'Error al obtener los profesores';
      const errorStatus = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(errorMessage, errorStatus);
    }
  }

  async findById(id: UUID): Promise<Teacher> {
    try {
      if (!id) throw new HttpException('ID query not provided', HttpStatus.BAD_REQUEST);
      const repoTeacher = await this.teacherRepository.findById(id);
      if (!repoTeacher) throw new HttpException('ID not found', HttpStatus.NOT_FOUND);
      return repoTeacher;
    } catch (error) {
      if (!error) throw new HttpException('Error al obtener el profesor', HttpStatus.INTERNAL_SERVER_ERROR);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(teacher: TeacherRegisterDto): Promise<Teacher> {
    try {
      const isExistsTeacher = await this.teacherRepository.isExists(teacher.name, teacher.lastname);
      if (isExistsTeacher) throw new HttpException('El profesor ya existe', HttpStatus.BAD_REQUEST);
      const repoUser = await this.userRepository.findById(teacher.userId);
      if (!repoUser) throw new HttpException('Este ID de usuario no existe', HttpStatus.BAD_REQUEST);
      const isExistsUserId = await this.teacherRepository.isExistsUserId(teacher.userId);
      if (isExistsUserId) throw new HttpException('Este ID de usuario ya se encuentra afiliado a un profesor', HttpStatus.BAD_REQUEST);
      if (repoUser.name !== teacher.name) throw new HttpException('El nombre no coincide con el del usuario', HttpStatus.BAD_REQUEST);
      if (repoUser.lastname !== teacher.lastname) throw new HttpException('El apellido no coincide con el del usuario', HttpStatus.BAD_REQUEST);
      if (repoUser.role !== Role.TEACHER) throw new HttpException(`El ID del usuario no es un tipo role 'TEACHER'`, HttpStatus.BAD_REQUEST);
      const newTeacher = await this.teacherRepository.create(
        {
          name: teacher.name,
          lastname: teacher.lastname,
          address: teacher.address,
          phone: teacher.phone,
          userId: repoUser
        }
      );
      const userId = {
        id: newTeacher.userId.id,
        name: newTeacher.userId.name,
        lastname: newTeacher.userId.lastname,
        email: newTeacher.userId.email,
        role: newTeacher.userId.role
      };
      return { userId: userId, ...newTeacher };

    } catch (error) {
      if (!error) throw new HttpException('Error al crear el profesor', HttpStatus.INTERNAL_SERVER_ERROR);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: UUID, teacher: TeacherDto): Promise<boolean> {
    try {
      if (!id) throw new HttpException('ID query not provided', HttpStatus.BAD_REQUEST)
      const teacherUpdated = await this.teacherRepository.updateAt(
        id,
        {
          name: teacher.name,
          lastname: teacher.lastname,
          address: teacher.address,
          phone: teacher.phone,
          userId: teacher.userId
        }
      );
      if (!teacherUpdated) throw new HttpException('Error al actualizar el profesor', HttpStatus.INTERNAL_SERVER_ERROR)
      return teacherUpdated;

    } catch (error) {
      if (!error) throw new HttpException('Error al actualizar el profesor', HttpStatus.INTERNAL_SERVER_ERROR);
      if (error.name === 'QueryFailedError') throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: UUID): Promise<boolean> {
    try {
      if (!id) throw new HttpException('ID not found', HttpStatus.BAD_REQUEST);
      const teacherDeleted = await this.teacherRepository.delete(id);
      if (!teacherDeleted) throw new HttpException(`'El ID de profesor que estas intentando eliminar no existe`, HttpStatus.NOT_FOUND)
      return teacherDeleted;
    } catch (error) {
      if (!error) throw new HttpException('Error al eliminar el profesor', HttpStatus.INTERNAL_SERVER_ERROR);
      if (error.name === 'QueryFailedError') throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}