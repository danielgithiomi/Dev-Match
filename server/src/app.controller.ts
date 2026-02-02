import { AppService } from './app.service';
import { Controller, Get } from '@nestjs/common';
import { Summary } from '@shared/decorators/response-summary.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Summary('Hello World!', 'Default response.')
  getHello(): string {
    return this.appService.getHello();
  }
}
