import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { TestDto } from './dto/test.dto';

@Injectable()
export class TestService {
  constructor(private readonly db: DatabaseService) {}

  createTest(data: TestDto) {
    return this.db.test.create({ data });
  }
}
