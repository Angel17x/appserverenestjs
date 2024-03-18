import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { UserDto } from 'src/applications/dto/register-user.dto';
import { Users } from 'src/domains/entities/user.entity';
import { UsersServiceImpl } from '../services/users.service.impl';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { UUID } from 'crypto';

@Controller()
@UseGuards(AuthMiddleware)
export class UsersController {
  constructor(private readonly usersService: UsersServiceImpl) {}

  @Get('/users')
  async findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @Get('/user')
  async findById(@Query('id') id: string): Promise<Users> {
    return this.usersService.findById(id);
  }

  @Post('/create-user')
  async create(@Body() user: UserDto): Promise<Users> {
    return this.usersService.create(user);
  }

  @Put('/update-user')
  async update(@Query() id: UUID, @Body() user: UserDto, @Res() res): Promise<void> {
    const result = await this.usersService.updateAt(id, user);
    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete('/delete-user')
  async delete(@Query() id: UUID, @Res() res): Promise<void> {
    await this.usersService.delete(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
