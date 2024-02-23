/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from 'src/applications/dto/login.dto';
import { LoginServiceImpl } from '../services/login.service.impl';
import { AuthEntity } from 'src/domains/entities/auth.entity';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginServiceImpl) {}

  @Post('/login')
  async login(@Body() user: LoginDto): Promise<AuthEntity | null> {
    return this.loginService.auth(user);
  }

}
