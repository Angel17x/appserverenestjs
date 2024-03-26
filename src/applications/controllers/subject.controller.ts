import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Query, Res } from '@nestjs/common';
import { PaginateResponse } from 'src/domains/entities/generic.paginate.entity';
import { Subject } from 'src/domains/entities/subject.entity';
import { SubjectServiceImpl } from '../services/subject.service.impl';
import { UUID } from 'crypto';
import { SubjectDto } from '../dto/subject.dto';

@Controller()
export class SubjectController {
  constructor(
    private readonly subjectService: SubjectServiceImpl
  ){}

  @Get('/subjects')
  async findAll(
    @Query('page') page: number = 0,
    @Query('limit') limit: number = 20
  ): Promise<PaginateResponse<Subject>> { 
    return await this.subjectService.findAll({page, limit});
  }

  @Get('/subject')
  async findById(@Query('id') id: UUID): Promise<Subject> {
    return this.subjectService.findById(id);
  }

  @Post('/create-subject')
  async create(@Body() user: SubjectDto): Promise<Subject> {
    return this.subjectService.create(user);
  }

  @Put('/update-subject')
  async update(@Query('id') id: UUID, @Body() user: SubjectDto, @Res() res): Promise<void> {
    await this.subjectService.updateAt(id, user);
    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete('/delete-subject')
  async delete(@Query('id') id: UUID, @Res() res): Promise<void> {
    await this.subjectService.delete(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}