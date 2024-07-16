import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropostaService } from '../proposta/proposta/proposta.service';
import { PropostaController } from '../proposta/proposta/proposta.controller';
import { Proposta } from '../proposta/proposta.entity/proposta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proposta])],
  providers: [PropostaService],
  controllers: [PropostaController],
})
export class PropostaModule {}
