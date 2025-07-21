import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

import { MachineStatusHistory } from './entities/machine-status-history.entity';
import { MachineMaster } from './entities/machine-master.entity';
import { ProductionProgress } from './entities/production-progress.entity';
import { MachineModule } from './machine/machine.module';

// Import các entity đã tạo
// 作成済みのエンティティをインポートする

dotenv.config(); 
// Load biến môi trường từ file .env
// .envファイルから環境変数を読み込む

@Module({
  imports: [
    // Kết nối SQL Server
    // SQL Server に接続する
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST as string,
      port: parseInt(process.env.DB_PORT as string, 10),
      username: process.env.DB_USERNAME as string,
      password: process.env.DB_PASSWORD as string,
      database: process.env.DB_DATABASE as string,
      entities: [MachineStatusHistory, MachineMaster, ProductionProgress], 
      // Sẽ thêm sau ở bước 2
      // ステップ2で追加する予定
      synchronize: false, 
      // KHÔNG tự tạo bảng mới!
      // 新しいテーブルを自動作成しないこと！
      options: {
        encrypt: false,
        enableArithAbort: true,
        instanceName: 'SQLEXPRESS', 
        // Nếu bạn sử dụng SQL Server Express
        // SQL Server Express を使用する場合
        trustServerCertificate: true, 
        // Quan trọng nếu SQL Server không dùng SSL chính thống
        // 正式なSSLを使用していないSQL Serverでは重要
      },
    }),
    MachineModule,
    
  ],
})
export class AppModule {
  // Constructor để kiểm tra kết nối cơ sở dữ liệu
  // và in ra thông tin kết nối
  // データベース接続を確認し、接続情報を表示するコンストラクタ
  constructor() {
    dotenv.config();
    console.log('>> DB_HOST = ' + process.env.DB_HOST);
  }
}
