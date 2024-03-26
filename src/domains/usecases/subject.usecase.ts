import { Catch, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PaginateDto } from "src/applications/dto/paginate.dto";
import { SubjectRepositoryImpl } from "src/infrastructures/repositories/subject.repository.impl";
import { PaginateResponse } from "../entities/generic.paginate.entity";
import { Subject } from "../entities/entities";
import { SubjectDto } from "src/applications/dto/subject.dto";
import { UUID } from "crypto";

@Injectable()
@Catch(HttpException)
export class SubjectUseCase {
  constructor(
    private readonly subjectRepository: SubjectRepositoryImpl,
  ) { }

  async findAll(paginate: PaginateDto): Promise<PaginateResponse<Subject>> {
    try {
      const paginateDefault = {
        page: !isNaN(paginate.page) && paginate.page > 0 ? paginate.page : 1,
        limit: !isNaN(paginate.limit) && paginate.limit > 0 ? paginate.limit : 20,
      };
      const [data, total] = await this.subjectRepository.findAll(paginateDefault);
      const totalPages = Math.ceil(total / paginateDefault.limit); // Usar paginateDefault.limit

      return { status: HttpStatus.OK, data: data, total: total, totalPages, ...paginateDefault };
    } catch (error) {
      const errorMessage = error.message || 'Error al obtener las materias';
      const errorStatus = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(errorMessage, errorStatus);
    }
  }

  async findById(id: UUID): Promise<Subject> {
    try {
      if (!id) throw new HttpException('ID query not provided', HttpStatus.BAD_REQUEST);
      const repoSubject = await this.subjectRepository.findById(id);
      if (!repoSubject) throw new HttpException('ID not found', HttpStatus.NOT_FOUND);
      return repoSubject;
    } catch (error) {
      if (!error) throw new HttpException('Error al obtener la materia', HttpStatus.INTERNAL_SERVER_ERROR);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(subject: SubjectDto): Promise<Subject> {
    try {
      const isExistsSubject = await this.subjectRepository.isExists(subject.name);
      if (isExistsSubject) throw new HttpException(`La materia a crear ya existe`, HttpStatus.BAD_REQUEST);
      const newSubject = await this.subjectRepository.create(
        {
          name: subject.name,
        }
      );
      return newSubject;

    } catch (error) {
      if (!error) throw new HttpException('Error al crear la materia', HttpStatus.INTERNAL_SERVER_ERROR);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: UUID, subject: SubjectDto): Promise<boolean> {
    try {
      console.warn(id);
      if (!id) throw new HttpException('ID query not provided', HttpStatus.BAD_REQUEST)
      const subjectUpdated = await this.subjectRepository.updateAt(id, { name: subject.name });
      if (!subjectUpdated) throw new HttpException('Error al actualizar la materia', HttpStatus.INTERNAL_SERVER_ERROR)
      return subjectUpdated;

    } catch (error) {
      if (!error) throw new HttpException('Error al actualizar la materia', HttpStatus.INTERNAL_SERVER_ERROR);
      if (error.name === 'QueryFailedError') throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: UUID): Promise<boolean> {
    try {
      if (!id) throw new HttpException('ID not found', HttpStatus.BAD_REQUEST);
      const subjectDeleted = await this.subjectRepository.delete(id);
      if (!subjectDeleted) throw new HttpException(`'El ID de la materia que estas intentando eliminar no existe`, HttpStatus.NOT_FOUND)
      return subjectDeleted;
    } catch (error) {
      if (!error) throw new HttpException('Error al eliminar la materia', HttpStatus.INTERNAL_SERVER_ERROR);
      if (error.name === 'QueryFailedError') throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}