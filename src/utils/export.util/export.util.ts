/* eslint-disable prettier/prettier */
import * as XLSX from 'exceljs';
import { Response } from 'express';
import { Proposta } from '../../proposta/proposta.entity/proposta.entity';

export class ExportUtil {
  static exportToCSV(propostas: Proposta[], fileName: string, res: Response): void {
    const csv = propostas.map(proposta => [
      proposta.id,
      proposta.nomeCliente,
      proposta.cpfCnpjCliente,
      proposta.produto,
      proposta.valorProposta,
      proposta.statusProposta,
      proposta.subStatusProposta,
      proposta.sla,
      proposta.analistaResponsavel,
      proposta.dataCriacao.toISOString(),
      proposta.criadaPor
    ].join(',')).join('\n');

    res.header('Content-Type', 'text/csv');
    res.attachment(`${fileName}.csv`);
    res.send(csv);
  }

  static async exportToXLSX(propostas: Proposta[], fileName: string, res: Response): Promise<void> {
    const workbook = new XLSX.Workbook();
    const worksheet = workbook.addWorksheet('Propostas');

    worksheet.columns = [
      { header: 'ID da Proposta', key: 'id', width: 15 },
      { header: 'Nome/Razão Social do cliente', key: 'nomeCliente', width: 30 },
      { header: 'CPF/CNPJ do cliente', key: 'cpfCnpjCliente', width: 25 },
      { header: 'Produto', key: 'produto', width: 15 },
      { header: 'Valor da Proposta', key: 'valorProposta', width: 15 },
      { header: 'Status da Proposta', key: 'statusProposta', width: 20 },
      { header: 'Sub-Status da Proposta (funil da mesa)', key: 'subStatusProposta', width: 30 },
      { header: 'SLA', key: 'sla', width: 15 },
      { header: 'Analista Responsável', key: 'analistaResponsavel', width: 25 },
      { header: 'Data Criação', key: 'dataCriacao', width: 20 },
      { header: 'Criada Por (responsável)', key: 'criadaPor', width: 25 },
    ];

    propostas.forEach(proposta => {
      worksheet.addRow({
        id: proposta.id,
        nomeCliente: proposta.nomeCliente,
        cpfCnpjCliente: proposta.cpfCnpjCliente,
        produto: proposta.produto,
        valorProposta: proposta.valorProposta,
        statusProposta: proposta.statusProposta,
        subStatusProposta: proposta.subStatusProposta,
        sla: proposta.sla,
        analistaResponsavel: proposta.analistaResponsavel,
        dataCriacao: proposta.dataCriacao,
        criadaPor: proposta.criadaPor
      });
    });

    res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.attachment(`${fileName}.xlsx`);

    await workbook.xlsx.write(res);
    res.end();
  }
}
