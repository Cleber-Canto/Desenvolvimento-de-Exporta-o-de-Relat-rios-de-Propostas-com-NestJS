import { Controller, Get, Query, Res } from '@nestjs/common';
import { PropostaService } from './proposta.service';
import { Response } from 'express';

@Controller('proposta')
export class PropostaController {
  constructor(private readonly propostaService: PropostaService) {}

  @Get('export')
  async exportPropostas(@Query('format') format: string, @Res() res: Response) {
    const userName = 'User';
    await this.propostaService.exportPropostas(format, res, userName);
  }
}
