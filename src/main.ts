import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // ✅ Tạo ứng dụng NestJS với CORS được bật
  // CORS (Cross-Origin Resource Sharing) cho phép ứng dụng frontend (Angular) gọi API từ backend (NestJS) mà không bị chặn bởi trình duyệt.
  // Việc bật CORS ở đây sẽ cho phép frontend và backend giao tiếp với nhau
  const app = await NestFactory.create(AppModule, { cors: true }); // ✅ bật CORS ở đây
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
