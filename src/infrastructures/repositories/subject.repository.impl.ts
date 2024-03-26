import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginateDto } from "src/applications/dto/paginate.dto";
import { SubjectDto } from "src/applications/dto/subject.dto";
import { Subject } from "src/domains/entities/entities";
import { SubjectRepository } from "src/domains/repositories/subjects.repository";
import { Repository } from "typeorm";


@Injectable()
export class SubjectRepositoryImpl implements SubjectRepository {
  constructor(
    @InjectRepository(Subject) private readonly subjectRepository: Repository<Subject>
  ) { }
  find(entity: SubjectDto): Promise<Subject> {
    return this.subjectRepository.findOne({ where: { ...entity } });
  }
  async findAll(paginate: PaginateDto): Promise<[Subject[], number]> {
    const [result, total] = await this.subjectRepository.findAndCount({
      skip: ((paginate.page - 1) * paginate.limit) ?? 0, // Cuántas filas se deben saltar
      take: paginate.limit, // Cuántas filas se deben tomar
    });
    return [result, total];
  }
  findById(id: any): Promise<Subject> {
    return this.subjectRepository.findOne(id);
  }
  create(entity: SubjectDto): Promise<Subject> {
    return this.subjectRepository.save(entity);
  }
  async updateAt(id: any, entity: SubjectDto): Promise<any> {
    return (await this.subjectRepository.update(
      id,
      {
        name: entity.name,
      }
    )).affected === 1 ? true : false;
  }
  async delete(id: any): Promise<boolean> {
    const result = (await this.subjectRepository.delete(id));
    return result.affected === 1 ? true : false
  }
  async isExists(name: string): Promise<boolean> {
    const user = await this.subjectRepository.findOne({ where: { name } });
    return !!user; // Devuelve true si se encuentra un usuario, false si no se encuentra
  }

}