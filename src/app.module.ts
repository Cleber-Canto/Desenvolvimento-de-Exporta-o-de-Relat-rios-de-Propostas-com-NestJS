import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { PostgresConfigService } from './config/postgres-config.service';
import { PropostaModule } from './proposta/proposta.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: PostgresConfigService,
    }),
    PropostaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
