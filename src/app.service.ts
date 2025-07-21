// ✅ AppService: cung cấp logic nghiệp vụ cho controller
// ✅ AppService：コントローラーに対して業務ロジックを提供するクラスです

import { Injectable } from '@nestjs/common';

// ✅ Đánh dấu lớp này có thể được Inject (chèn vào) bởi các class khác
// ✅ このクラスは他のクラスに注入できることを示すデコレーター
@Injectable()
export class AppService {
  // ✅ Phương thức trả về chuỗi "Hello World!" (ví dụ đơn giản)
  // ✅ 文字列 "Hello World!" を返すシンプルなメソッド
  getHello(): string {
    return 'Hello World!';
  }
}
