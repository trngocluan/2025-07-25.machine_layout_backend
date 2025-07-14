import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

import { MachineStatusHistory } from './entities/machine-status-history.entity';
import { MachineMaster } from './entities/machine-master.entity';
import { ProductionProgress } from './entities/production-progress.entity';
// Import các entity đã tạo

dotenv.config(); // Load biến môi trường từ file .env

@Module({
  imports: [
    // Kết nối SQL Server
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST as string,
      port: parseInt(process.env.DB_PORT as string, 10),
      username: process.env.DB_USERNAME as string,
      password: process.env.DB_PASSWORD as string,
      database: process.env.DB_DATABASE as string,
      entities: [MachineStatusHistory, MachineMaster, ProductionProgress], // Sẽ thêm sau ở bước 2
      synchronize: false, // KHÔNG tự tạo bảng mới!
      options: {
        encrypt: false,
        enableArithAbort: true,
        instanceName: 'SQLEXPRESS', // Nếu bạn sử dụng SQL Server Express
        trustServerCertificate: true, // Quan trọng nếu SQL Server không dùng SSL chính thống
      },
    }),
    
  ],
})
export class AppModule {
  
}
