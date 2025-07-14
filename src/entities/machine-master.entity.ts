//src/entities/machine-master.entity.ts
import { Column, Entity, PrimaryColumn } from 'typeorm';

// Bảng B - Thông tin thiết bị (Master)
@Entity({ name: 'DE_MST_機器マスタ' })
export class MachineMaster {
  @PrimaryColumn({ name: '工場区分' })
  factory_type: number; // Phân loại nhà máy (VD: 2 = Mercury)

  @PrimaryColumn({ name: '機器番号' })
  machine_no: number; // Mã thiết bị (Số máy)

  @Column({ name: '機器区分' })
  machine_type: number; // Phân loại thiết bị (VD: 40 = cuối line có counter)

  @Column({ name: 'CT' })
  ct: number; // Cycle time chuẩn của thiết bị (sử dụng tính hiệu suất)
}
