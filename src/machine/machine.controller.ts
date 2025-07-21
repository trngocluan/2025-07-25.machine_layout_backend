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
