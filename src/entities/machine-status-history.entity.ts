import { Column, Entity, PrimaryColumn } from 'typeorm';

// ✅ Bảng A - Lịch sử trạng thái vận hành của máy
// ✅ Aテーブル - 設備の運転状態履歴
@Entity({ name: 'DE_TBL_運転状態履歴' })
export class MachineStatusHistory {

  @PrimaryColumn({ name: '工場区分' })
  factory_type: number; 
  // ✅ Phân loại nhà máy
  // ✅ 工場区分

  @PrimaryColumn({ name: '機器番号' })
  machine_no: number; 
  // ✅ Mã số thiết bị (Số máy)
  // ✅ 設備番号（マシン番号）

  @Column({ name: '運転状態' })
  status: number; 
  // ✅ Trạng thái vận hành: 0 - dừng, 1 - chạy, 2 - lỗi
  // ✅ 運転状態: 0＝停止, 1＝稼働中, 2＝異常

  @Column({ name: 'X' })
  x: number; 
  // ✅ Tọa độ X trên layout
  // ✅ レイアウト上のX座標

  @Column({ name: 'Y' })
  y: number; 
  // ✅ Tọa độ Y trên layout
  // ✅ レイアウト上のY座標
}
