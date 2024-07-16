import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Proposta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomeCliente: string;

  @Column()
  cpfCnpjCliente: string;

  @Column()
  produto: string;

  @Column('decimal')
  valorProposta: number;

  @Column()
  statusProposta: string;

  @Column()
  subStatusProposta: string;

  @Column()
  sla: string;

  @Column()
  analistaResponsavel: string;

  @Column()
  dataCriacao: Date;

  @Column()
  criadaPor: string;
}
