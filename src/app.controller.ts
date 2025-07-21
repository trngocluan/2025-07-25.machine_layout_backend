// ✅ Bộ điều khiển chính (Controller) của ứng dụng NestJS
// ✅ NestJSアプリケーションのメインコントローラーです

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// ✅ Controller định nghĩa các endpoint của API (ví dụ: GET /)
// ✅ コントローラーはAPIのエンドポイント（例：GET /）を定義します
@Controller()
export class AppController {
  // ✅ Inject (chèn vào) một đối tượng AppService để xử lý logic
  // ✅ ロジック処理のためにAppServiceを注入します
  constructor(private readonly appService: AppService) {}

  // ✅ Định nghĩa một route GET tại endpoint "/"
  // ✅ エンドポイント「/」に対するGETルートを定義します
  @Get()
  getHello(): string {
    // ✅ Trả về chuỗi từ phương thức getHello() trong AppService
    // ✅ AppServiceのgetHello()メソッドから文字列を返します
    return this.appService.getHello();
  }
}