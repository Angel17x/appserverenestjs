import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { AuthMiddleware } from 'src/applications/middlewares/auth.middleware';
import { UUID } from 'crypto';
import { TeacherServiceImpl } from '../services/teacher.service.impl';
import { TeacherDto } from '../dto/teacher.dto';
import { Teacher } from 'src/domains/entities/teacher.entity';
import { TeacherRegisterDto } from '../dto/register-teacher';
import { PaginateResponse } from 'src/domains/entities/generic.paginate.entity';

@Controller()
@UseGuards(AuthMiddleware)
export class TeachersController {
  constructor(private readonly teacherService: TeacherServiceImpl) {}

  @Get('/teachers')
  async findAll(
    @Query('page') page: number = 0,
    @Query('limit') limit: number = 20
  ): Promise<PaginateResponse<Teacher>> { // establecer un límite máximo de 100
    return await this.teacherService.findAll({page, limit});
  }

  @Get('/teacher')
  async findById(@Query('id') id: UUID): Promise<Teacher> {
    return this.teacherService.findById(id);
  }

  @Post('/create-teacher')
  async create(@Body() user: TeacherRegisterDto): Promise<Teacher> {
    return this.teacherService.create(user);
  }

  @Put('/update-teacher')
  async update(@Query('id') id: UUID, @Body() user: TeacherDto, @Res() res): Promise<void> {
    await this.teacherService.updateAt(id, user);
    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete('/delete-teacher')
  async delete(@Query('id') id: UUID, @Res() res): Promise<void> {
    await this.teacherService.delete(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
