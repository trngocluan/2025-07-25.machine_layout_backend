// ✅ Khai báo module "Machine" theo kiến trúc của NestJS
// ✅ NestJSの構成に従って「Machine」モジュールを定義する

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MachineController } from './machine.controller';
import { MachineService } from './machine.service';
import { MachineMaster } from '../entities/machine-master.entity';
import { MachineStatusHistory } from '../entities/machine-status-history.entity';
import { ProductionProgress } from '../entities/production-progress.entity';

@Module({
  imports: [
    // ✅ Đăng ký 3 entity liên quan đến module này
    // ✅ このモジュールで使用する3つのエンティティを登録する
    TypeOrmModule.forFeature([
      MachineMaster,
      MachineStatusHistory,
      ProductionProgress,
    ]),
  ],
  controllers: [MachineController], // ✅ Khai báo controller
  // ✅ コントローラーを定義
  providers: [MachineService], // ✅ Khai báo service cung cấp logic
  // ✅ ビジネスロジックを提供するサービスを定義
})
export class MachineModule {}
