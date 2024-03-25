import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Query, Res, UseGuards } from "@nestjs/common";
import { StudentServiceImpl } from "../services/student.service.impl";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { UUID } from "crypto";
import { Student } from "src/domains/entities/student.entity";
import { StudentDto } from "../dto/student.dto";


@Controller()
@UseGuards(AuthMiddleware)
export class StudentController {
  constructor(private readonly studentService: StudentServiceImpl) {}
  
  @Get('/students')
  findAll(): Promise<Student[]> {
    return this.studentService.findAll();
  }

  @Get('/student')
  findById(@Query('id') id: UUID): Promise<Student> {
    return this.studentService.findById(id);
  }

  @Post('/create-student')
  create(@Body() student: StudentDto): Promise<Student> {
    return this.studentService.create(student);
  }

  @Put('/update-student')
  async update(@Query() id: UUID, @Body() student: StudentDto, @Res() res): Promise<void> {
    await this.studentService.updateAt(id, student);
    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete('/delete-student')
  async delete(@Query() id: UUID, @Res() res): Promise<void> {
    await this.studentService.delete(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}