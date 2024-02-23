import { Controller, Get, HttpStatus } from "@nestjs/common";

@Controller()
export class InitController {
  constructor() {}
  
  @Get('/')
  async init(): Promise<any> {
    return ({
      status: HttpStatus.OK,
      message: 'welcome to the application school'
    })
  }
}