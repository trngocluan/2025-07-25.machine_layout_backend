// ==============================================================================
// src/entities/machine-master.entity.ts
// 📄 machine-master.entity.ts 
// 🇻🇳 Entity ánh xạ bảng thông tin thiết bị (master)
// 🇯🇵 設備マスタ情報テーブルに対応するエンティティ
//
// ✅ 🇻🇳 File này ánh xạ bảng `DE_MST_機器マスタ` trong cơ sở dữ liệu SQL Server.
//       Đây là bảng master lưu thông tin cơ bản của từng thiết bị trong nhà máy,
//       như số máy, loại thiết bị, cycle time (CT), v.v.
//
// ✅ 🇯🇵 本ファイルはSQL Serverの `DE_MST_機器マスタ` テーブルと対応しています。
//       各設備の基本情報（設備番号、設備区分、標準CTなど）を保持するマスタテーブルです。
// ==============================================================================

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
