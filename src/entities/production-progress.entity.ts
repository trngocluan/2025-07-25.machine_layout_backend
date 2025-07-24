// ==============================================================================
// src/entities/production-progress.entity.ts
// 📄 production-progress.entity.ts - 🇻🇳 Entity ánh xạ bảng dữ liệu sản lượng theo giờ
//                                   🇯🇵 時間帯別の生産進捗テーブルに対応するエンティティ
//
// ✅ 🇻🇳 File này ánh xạ bảng `DE_TBL_生産進捗` trong cơ sở dữ liệu SQL Server.
//       Mỗi bản ghi tương ứng với sản lượng tại một thiết bị, trong một ngày và một khung giờ.
//
// ✅ 🇯🇵 本ファイルはSQL Server上の `DE_TBL_生産進捗` テーブルと対応します。
//       各レコードは、ある設備・日付・時間帯における累積生産数を表します。
// ==============================================================================

import { Column, Entity, PrimaryColumn } from 'typeorm';

// ✅ Bảng C - Dữ liệu sản lượng theo thời gian
// ✅ Cテーブル - 時間ごとの生産数データ
@Entity({ name: 'DE_TBL_生産進捗' })
export class ProductionProgress {

  @PrimaryColumn({ name: '機器番号' })
  machine_no: number; 
  // ✅ Mã thiết bị
  // ✅ 設備番号

  @PrimaryColumn({ name: '日付' })
  date: string; 
  // ✅ Ngày sản xuất (format yyyy-MM-dd)
  // ✅ 生産日付（形式: yyyy-MM-dd）

  @PrimaryColumn({ name: '時間' })
  hour: number; 
  // ✅ Khung giờ sản xuất (VD: 12 = 08:00–12:59)
  // ✅ 生産時間帯（例：12＝08:00〜12:59）

  @Column({ name: '生産数' })
  counter: number; 
  // ✅ Sản lượng cộng dồn tính đến khung giờ
  // ✅ 指定時間帯までの累積生産数
}
