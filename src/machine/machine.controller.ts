// ==============================================================================
// src/machine/machine.controller.ts
// 📄 machine.controller.ts - 🇻🇳 Controller xử lý API lấy danh sách máy
//                          🇯🇵 設備一覧データを提供するコントローラー
//
// ✅ 🇻🇳 File này định nghĩa route `/machine` dùng HTTP GET:
//       • Nhận query param `factory` (mã nhà máy)
//       • Gọi service để truy vấn và trả về danh sách máy, tọa độ, trạng thái, hiệu suất,...
//
// ✅ 🇯🇵 このファイルでは、GET `/machine` のルートを定義：
//       • クエリパラメータ `factory`（工場コード）を受け取る
//       • サービスを呼び出し、設備・位置・状態・パフォーマンスを返す
// ==============================================================================

// ✅ Controller xử lý API liên quan đến máy móc
// ✅ 設備に関するAPIを処理するコントローラー

import { Controller, Get, Query } from '@nestjs/common';
import { MachineService } from './machine.service';

// ✅ Controller này lắng nghe các request tại endpoint '/machine'
// ✅ このコントローラーは '/machine' エンドポイントのリクエストを受け付ける
@Controller('machine')
export class MachineController {
  // ✅ Inject service xử lý logic cho máy
  // ✅ MachineServiceを注入してビジネスロジックを処理
  constructor(private readonly machineService: MachineService) {}

  /**
   * API: /machine?factory=2
   * Trả về danh sách máy, trạng thái, vị trí, hiệu suất,...
   * API: /machine?factory=2
   * 設備の一覧、状態、位置、稼働率などを返す
   */
  @Get()
  async getMachines(@Query('factory') factory: number) {
    return this.machineService.getMachineSummary(factory);
  }
}
