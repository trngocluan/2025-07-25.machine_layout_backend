// ==============================================================================
// src/machine/machine.module.ts
// 📄 machine.module.ts - 🇻🇳 Định nghĩa module "Machine" trong kiến trúc NestJS
//                      🇯🇵 NestJSアーキテクチャにおける「Machine」モジュールの定義
//
// ✅ 🇻🇳 File này chịu trách nhiệm:
//       • Tổ chức controller, service, và các entity liên quan đến module "Machine"
//       • Kết nối TypeORM với các bảng máy, trạng thái, và sản lượng
//
// ✅ 🇯🇵 このファイルでは以下の役割を担います：
//       • 「Machine」モジュールに必要なコントローラー、サービス、エンティティを整理
//       • TypeORM経由で機械・状態・生産数テーブルと接続
// ==============================================================================

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
