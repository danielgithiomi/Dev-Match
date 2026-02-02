import { Body, Controller, Get, Post } from '@nestjs/common';
import { TestService } from './test.service';
import { TestDto } from './dto/test.dto';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  test(): string {
    return 'This is a test!';
  }

  @Post()
  createTest(@Body() test: TestDto) {
    return this.testService.createTest(test);
  }
}
