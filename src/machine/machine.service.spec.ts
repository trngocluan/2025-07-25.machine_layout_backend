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
