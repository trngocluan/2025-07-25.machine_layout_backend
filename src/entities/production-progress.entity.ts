//src/entities/production-progress.entity.ts
import { Column, Entity, PrimaryColumn } from 'typeorm';

// Bảng C - Dữ liệu sản lượng theo thời gian
@Entity({ name: 'DE_TBL_生産進捗' })
export class ProductionProgress {
  @PrimaryColumn({ name: '機器番号' })
  machine_no: number; // Mã thiết bị

  @PrimaryColumn({ name: '日付' })
  date: string; // Ngày sản xuất (format yyyy-MM-dd)

  @PrimaryColumn({ name: '時間' })
  hour: number; // Khung giờ sản xuất (VD: 12 = 08:00–12:59)

  @Column({ name: '生産数' })
  counter: number; // Sản lượng cộng dồn tính đến khung giờ
}
