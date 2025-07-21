// ✅ Unit test cho AppController bằng Jest + NestJS TestingModule
// ✅ JestとNestJSのTestingModuleを使ってAppControllerのユニットテストを行う

import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// ✅ Mô tả nhóm test cho AppController
// ✅ AppControllerに関するテストグループを定義
describe('AppController', () => {
  let appController: AppController;

  // ✅ Thiết lập module và inject controller trước mỗi test
  // ✅ 各テストの前にモジュールを作成し、コントローラーを注入
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  // ✅ Kiểm tra endpoint gốc trả về chuỗi đúng
  // ✅ ルートエンドポイントが正しい文字列を返すかを確認
  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
