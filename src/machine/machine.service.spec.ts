// ==============================================================================
// src/machine/machine.service.spec.ts
// 📄 machine.service.spec.ts - 🇻🇳 Unit test mẫu cho MachineService (NestJS + Jest)
//                            🇯🇵 MachineServiceに対する基本的なユニットテスト（NestJS + Jest）
//
// ✅ 🇻🇳 File này kiểm tra việc khởi tạo `MachineService` có thành công hay không.
//         Đây là bước đầu để viết các test case nâng cao hơn sau này.
//
// ✅ 🇯🇵 このファイルでは、`MachineService` が正常に初期化されるかを検証します。
//         今後、より複雑なテストケースを追加する際の基礎になります。
// ==============================================================================

// ✅ Unit test cho MachineService bằng Jest + NestJS TestingModule
// ✅ JestとNestJSのTestingModuleを使ってMachineServiceのユニットテストを行う

import { Test, TestingModule } from '@nestjs/testing';
import { MachineService } from './machine.service';

// ✅ Định nghĩa nhóm test cho MachineService
// ✅ MachineServiceに対するテストグループを定義
describe('MachineService', () => {
  let service: MachineService;

  // ✅ Thiết lập module và inject service trước mỗi test
  // ✅ 各テストの前にモジュールを構成し、サービスを注入する
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MachineService],
    }).compile();

    service = module.get<MachineService>(MachineService);
  });

  // ✅ Kiểm tra xem service có được khởi tạo hay không
  // ✅ サービスが正しく初期化されているかをテスト
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
