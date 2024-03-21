import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "MINI API DE RESERVATION D'EVENEMENTS - TP1 - NESTJS - 2024";
  }
}
