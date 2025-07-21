import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // ✅ Tạo ứng dụng NestJS với CORS được bật
  // ✅ CORSを有効にしたNestJSアプリケーションを作成する

  // CORS (Cross-Origin Resource Sharing) cho phép ứng dụng frontend (Angular)
  // gọi API từ backend (NestJS) mà không bị chặn bởi trình duyệt.
  // Việc bật CORS ở đây sẽ cho phép frontend và backend giao tiếp với nhau
  // ✅ CORS（オリジン間リソース共有）を有効にすることで、
  // ✅ フロントエンド（Angular）からバックエンド（NestJS）へのAPI呼び出しが可能になります。
  // ✅ これにより、ブラウザによる制限を回避し、両者の通信が可能になります。
  const app = await NestFactory.create(AppModule, { cors: true }); // ✅ bật CORS ở đây
  await app.listen(process.env.PORT ?? 3000); // ✅ Lắng nghe cổng từ biến môi trường hoặc mặc định là 3000
  // ✅ 環境変数で指定されたポート、またはデフォルトの3000番ポートで待機します
}
bootstrap();
