import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { StudentServiceImpl } from '../services/student.service.impl';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { UUID } from 'crypto';
import { Student } from 'src/domains/entities/student.entity';
import { StudentDto } from '../dto/student.dto';
import { PaginateResponse } from 'src/domains/entities/generic.paginate.entity';
import { RegisterStudentDto } from '../dto/register-student.dto';
import { UpdateStudentDto } from '../dto/update-student.dto';

@Controller()
@UseGuards(AuthMiddleware)
export class StudentController {
  constructor(private readonly studentService: StudentServiceImpl) {}

  @Get('/students')
  findAll(
    @Query('page') page: number = 0,
    @Query('limit') limit: number = 20,
  ): Promise<PaginateResponse<Student>> {
    return this.studentService.findAll({ page, limit });
  }

  @Get('/student')
  findById(@Query('id') id: UUID): Promise<Student> {
    return this.studentService.findById(id);
  }

  @Post('/create-student')
  create(@Body() student: RegisterStudentDto): Promise<Student> {
    return this.studentService.create(student);
  }

  @Put('/update-student')
  async update(
    @Query('id') id: UUID,
    @Body() student: UpdateStudentDto,
    @Res() res,
  ): Promise<void> {
    await this.studentService.updateAt(id, student);
    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete('/delete-student')
  async delete(@Query('id') id: UUID, @Res() res): Promise<void> {
    await this.studentService.delete(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
