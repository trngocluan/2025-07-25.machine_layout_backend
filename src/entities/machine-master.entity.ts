import { Column, Entity, PrimaryColumn } from 'typeorm';

// ✅ Bảng B - Thông tin thiết bị (Master)
// ✅ Bテーブル - 設備マスタ情報
@Entity({ name: 'DE_MST_機器マスタ' })
export class MachineMaster {

  @PrimaryColumn({ name: '工場区分' })
  factory_type: number; 
  // ✅ Phân loại nhà máy (VD: 2 = Mercury)
  // ✅ 工場の区分（例：2 = Mercury）

  @PrimaryColumn({ name: '機器番号' })
  machine_no: number; 
  // ✅ Mã thiết bị (Số máy)
  // ✅ 設備番号（マシン番号）

  @Column({ name: '機器区分' })
  machine_type: number; 
  // ✅ Phân loại thiết bị (VD: 40 = cuối line có counter)
  // ✅ 設備の種類（例：40 = カウンター付きのライン終点設備）

  @Column({ name: 'CT' })
  ct: number; 
  // ✅ Cycle time chuẩn của thiết bị (dùng để tính hiệu suất)
  // ✅ 設備の標準サイクルタイム（稼働率の計算に使用）
}
