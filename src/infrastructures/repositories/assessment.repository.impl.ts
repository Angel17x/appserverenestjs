import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AssessmentDto } from "src/applications/dto/assessment.dto";
import { PaginateDto } from "src/applications/dto/paginate.dto";
import { Assessment } from "src/domains/entities/assessment.entity";
import { AssessmentRepository } from "src/domains/repositories/assessment.repository";
import { Repository } from "typeorm";


@Injectable()
export class AssessmentRepositoryImpl implements AssessmentRepository {
  constructor(
    @InjectRepository(Assessment) private readonly assessmentRepository: Repository<Assessment>
  ) { }
  find(entity: AssessmentDto): Promise<Assessment> {
    return this.assessmentRepository.findOne({ where: { ...entity } });
  }
  async findAll(paginate: PaginateDto): Promise<[Assessment[], number]> {
    const [result, total] = await this.assessmentRepository.findAndCount({
      skip: ((paginate.page - 1) * paginate.limit) ?? 0, // Cuántas filas se deben saltar
      take: paginate.limit, // Cuántas filas se deben tomar
    });
    return [result, total];
  }
  findById(id: any): Promise<Assessment> {
    return this.assessmentRepository.findOne(id);
  }
  create(entity: AssessmentDto): Promise<Assessment> {
    return this.assessmentRepository.save(entity);
  }
  async updateAt(id: any, entity: AssessmentDto): Promise<any> {
    return (await this.assessmentRepository.update(
      id,
      {
        name: entity.name,
        description: entity.description,
        dateStartAssessment: entity.dateStartAssessment,
        dateEndAssessment: entity.dateEndAssessment,
        dateCreatedAssessment: entity.dateCreatedAssessment,
        idSubject: entity.idSubject,
        idTeacher: entity.idTeacher,
        userId: entity.userId
      }
    )).affected === 1 ? true : false;
  }
  async delete(id: any): Promise<boolean> {
    const result = (await this.assessmentRepository.delete(id));
    return result.affected === 1 ? true : false
  }
  async isExists(name: string): Promise<boolean> {
    const user = await this.assessmentRepository.findOne({ where: { name } });
    return !!user; // Devuelve true si se encuentra un usuario, false si no se encuentra
  }

} 