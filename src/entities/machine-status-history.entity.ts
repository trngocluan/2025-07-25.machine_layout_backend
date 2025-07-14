//src/entities/machine-status-history.entity.ts
import { Column, Entity, PrimaryColumn } from 'typeorm';

// Bảng A - Lịch sử trạng thái vận hành của máy
@Entity({ name: 'DE_TBL_運転状態履歴' })
export class MachineStatusHistory {
  @PrimaryColumn({ name: '工場区分' })
  factory_type: number; // Phân loại nhà máy

  @PrimaryColumn({ name: '機器番号' })
  machine_no: number; // Mã số thiết bị (Số máy)

  @Column({ name: '運転状態' })
  status: number; // Trạng thái vận hành: 0 - dừng, 1 - chạy, 2 - lỗi

  @Column({ name: 'X位置' })
  x: number; // Tọa độ X trên layout

  @Column({ name: 'Y位置' })
  y: number; // Tọa độ Y trên layout
}
