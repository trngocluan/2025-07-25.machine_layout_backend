import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MachineController } from './machine.controller';
import { MachineService } from './machine.service';
import { MachineMaster } from '../entities/machine-master.entity';
import { MachineStatusHistory } from '../entities/machine-status-history.entity';
import { ProductionProgress } from '../entities/production-progress.entity';

@Module({
  imports: [
    // Đăng ký 3 entity liên quan đến module này
    TypeOrmModule.forFeature([
      MachineMaster,
      MachineStatusHistory,
      ProductionProgress,
    ]),
  ],
  controllers: [MachineController],
  providers: [MachineService],
})
export class MachineModule {}

