// ✅ Unit test cho MachineController bằng cách sử dụng Jest và NestJS TestingModule
// ✅ JestとNestJSのTestingModuleを使ってMachineControllerのユニットテストを行う

import { Test, TestingModule } from '@nestjs/testing';
import { MachineController } from './machine.controller';

// ✅ Mô tả nhóm test cho MachineController
// ✅ MachineControllerに関するテストグループを定義
describe('MachineController', () => {
  let controller: MachineController;

  // ✅ Thiết lập trước mỗi test: tạo module có controller cần test
  // ✅ 各テストの前に実行される処理：テスト対象のコントローラーを含むモジュールを生成
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MachineController],
    }).compile();

    controller = module.get<MachineController>(MachineController);
  });

  // ✅ Kiểm tra controller có được khởi tạo không
  // ✅ コントローラーが正しく生成されたかを確認
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

