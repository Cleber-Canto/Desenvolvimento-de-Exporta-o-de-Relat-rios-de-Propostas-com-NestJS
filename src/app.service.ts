import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello, World! Welcome to the amazing world of development with NestJS!';
  }
}
