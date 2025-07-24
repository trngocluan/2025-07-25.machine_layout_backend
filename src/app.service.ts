// ==============================================================================
// src/app.service.ts
// 📄 app.service.ts - 🇻🇳 Service mẫu cung cấp logic xử lý cho AppController
//                    🇯🇵 AppController に対する処理ロジックを提供するサンプルサービス
//
// ✅ 🇻🇳 File này là ví dụ đơn giản cho cách dùng service trong NestJS:
//       • Được inject vào controller để tách riêng logic xử lý
//       • Cung cấp một hàm đơn `getHello()` trả về chuỗi "Hello World!"
//
// ✅ 🇯🇵 このファイルは NestJS におけるサービスの基本的な使い方を示す例です：
//       • コントローラーに注入され、処理ロジックを分離
//       • "Hello World!" を返す単純なメソッドを提供
// ==============================================================================

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
