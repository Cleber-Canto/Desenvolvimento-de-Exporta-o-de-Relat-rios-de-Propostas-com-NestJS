/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proposta } from '../proposta.entity/proposta.entity';
import { Response } from 'express';
import { ExportUtil } from '../../utils/export.util/export.util';

@Injectable()
export class PropostaService {
  constructor(
    @InjectRepository(Proposta)
    private propostaRepository: Repository<Proposta>,
  ) {}

  async findAll(): Promise<Proposta[]> {
    return this.propostaRepository.find();
  }

  async exportPropostas(format: string, res: Response, userName: string): Promise<void> {
    const propostas = await this.findAll();
    const fileName = `${userName} - Acompanhamento de Proposta - ${new Date().toLocaleDateString().replace(/\//g, '.')}`;

    if (format === 'csv') {
      ExportUtil.exportToCSV(propostas, fileName, res);
    } else if (format === 'xlsx') {
      await ExportUtil.exportToXLSX(propostas, fileName, res);
    }
  }
}