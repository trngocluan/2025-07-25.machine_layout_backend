// ==============================================================================
// src/machine/machine.service.ts
// 📄 machine.service.ts - 🇻🇳 Service xử lý nghiệp vụ và truy vấn dữ liệu máy
//                        🇯🇵 設備情報の取得と稼働率計算を行うサービスロジック
//
// ✅ 🇻🇳 File này chịu trách nhiệm:
//       • Truy vấn dữ liệu từ 3 bảng: Master, Trạng thái, Sản lượng
//       • Tính toán hiệu suất máy (performance) theo thời gian thực
//       • Tách xử lý riêng cho máy loại 40 (cuối line) để tính hiệu suất
//       • Phân biệt ngày/giờ theo ca làm việc (ca từ 08:00)
//
// ✅ 🇯🇵 このファイルでは以下の処理を担当：
//       • 機器マスタ・状態履歴・生産進捗の3テーブルを結合してデータ取得
//       • ライン末端機械（タイプ40）に対する稼働率の算出ロジック
//       • シフトの開始時間（08:00）に基づく日付・時間の補正処理
//       • 各機械の座標・状態・生産数を含む一覧を返す
// ==============================================================================

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual, DataSource } from 'typeorm';
import { MachineMaster } from '../entities/machine-master.entity';
import { MachineStatusHistory } from '../entities/machine-status-history.entity';
import { ProductionProgress } from '../entities/production-progress.entity';

@Injectable()
// ✅ Service xử lý logic truy vấn dữ liệu máy
// ✅ 設備データの取得ロジックを処理するサービス
export class MachineService {
  constructor(
    // ✅ Inject DataSource để sử dụng các phương thức truy vấn nâng cao
    // ✅ 高度なクエリを実行するためにDataSourceを注入
    private dataSource: DataSource,
    
    // ✅ Inject các repository tương ứng với các entity
    // ✅ 各エンティティに対応するリポジトリを注入
    @InjectRepository(MachineMaster)
    private machineRepo: Repository<MachineMaster>,

    @InjectRepository(MachineStatusHistory)
    private statusRepo: Repository<MachineStatusHistory>,

    @InjectRepository(ProductionProgress)
    private progressRepo: Repository<ProductionProgress>,
  ) {}

  /**
   * ✅ Lấy danh sách máy của nhà máy, bao gồm trạng thái, tọa độ, hiệu suất,...
   * ✅ 工場の設備一覧を取得（状態・座標・稼働率など含む）
   * @param factory_type số nhà máy cần lấy (VD: 2 là Mercury)
   * @param factory_type 対象の工場コード（例：2はMercury）
   */
  async getMachineSummary(factory_type: number) {

    // ✅ Lấy giờ hệ thống từ SQL Server để làm chuẩn
    // ✅ SQL Serverから現在時刻を取得し、基準とする
    const dbNowResult = await this.dataSource.query(`SELECT GETDATE() AS now`);
    const now = new Date(dbNowResult[0].now); // giờ JST từ SQL Server
    // SQL Serverから得たJST時刻

    // ✅ Tính ngày và giờ tương ứng với ca làm việc (mốc bắt đầu ca là 8:00)
    // ✅ シフトの開始時間（08:00）を基準として現在のシフト日付と時間を計算
    const startOfShift = new Date(now);
    startOfShift.setHours(8, 0, 0, 0);

    let shiftDate: string;
    let hour_for_query: number;

    if (now >= startOfShift) {
      // 👉 Đang trong ca hôm nay
      // 👉 本日のシフト中
      shiftDate = now.toISOString().split('T')[0];
      const diffMs = now.getTime() - startOfShift.getTime();
      const hour = Math.floor(diffMs / (60 * 60 * 1000));
      hour_for_query = hour + 8 - 1;
      // +8 để bắt đầu từ 08:00, -1 để lấy khung giờ trước đó (đã có counter)
    } else {
      // 👉 Trước 8h sáng → thuộc ca hôm qua
      // 👉 朝8時前 → 前日のシフトに属する
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      shiftDate = yesterday.toISOString().split('T')[0];
      const startOfYesterday = new Date(yesterday);
      startOfYesterday.setHours(8, 0, 0, 0);
      const diffMs = now.getTime() - startOfYesterday.getTime();
      const hour = Math.floor(diffMs / (60 * 60 * 1000));
      hour_for_query = hour - 24 + 8 - 1;
      if (hour_for_query < 0) hour_for_query += 24;
    }

    // ✅ Truy vấn dữ liệu kết hợp 3 bảng
    // ✅ 3つのテーブルをJOINして必要なデータを取得
    const raw = await this.dataSource
      .createQueryBuilder()
      .select([
        'machine.機器番号 AS machine_no',
        'machine.機器区分 AS machine_type',
        'machine.CT AS ct',
        'status.X AS x',
        'status.Y AS y',
        'status.運転状態 AS status',
        'progress.生産数 AS counter',
      ])
      .from('DE_MST_機器マスタ', 'machine')
      .leftJoin('DE_TBL_運転状態履歴', 'status', `
        status.工場区分 = machine.工場区分 AND
        status.機器番号 = machine.機器番号
      `)
      .leftJoin('DE_TBL_生産進捗', 'progress', `
        progress.機器番号 = machine.機器番号 AND
        progress.日付 = :date AND
        progress.時間 = :hour
      `, { date: shiftDate, hour: hour_for_query })
      .where('machine.工場区分 = :factory', { factory: factory_type })
      .getRawMany();

    // ✅ Xử lý dữ liệu và tính hiệu suất nếu đủ điều kiện
    // ✅ 条件を満たす場合に稼働率を計算して整形データを返す
    const results = raw.map(row => {
      const machine_type = +row.machine_type;
      const ct = machine_type === 40 ? parseFloat(row.ct) : null;
      const counter = row.counter !== null ? parseInt(row.counter) : null;

      let performance: number | null = null;

      // ✅ Chỉ tính hiệu suất cho máy loại 40, có ct và counter hợp lệ
      // ✅ タイプ40の機器で、CTとカウンターがある場合のみ稼働率を計算
      if (ct && counter !== null && machine_type === 40 && hour_for_query >= 0) {
        let seconds: number;

        if (hour_for_query < 8) {
          // 👉 Trường hợp trước 08:00 → ca hôm qua → +24 giờ
          // 👉 朝8時前 → 昨日のシフト → +24時間で補正
          seconds = (hour_for_query - 8 + 1 + 24) * 3600;
        } else {
          // 👉 Ca hôm nay → từ 08:00 đến giờ hiện tại
          // 👉 本日のシフト → 08:00から現在時刻まで
          seconds = (hour_for_query - 8 + 1) * 3600;
        }

        // ✅ Hiệu suất (%) = sản lượng / (thời gian chạy / ct)
        // ✅ 稼働率(%) = 生産数 ÷ (稼働時間 ÷ CT)
        performance = +(counter / (seconds / ct)).toFixed(3);
      }

      return {
        machine_no: +row.machine_no,
        x: row.x !== null ? +row.x : null,
        y: row.y !== null ? +row.y : null,
        status: row.status !== null ? +row.status : null,
        ct,
        machine_type,
        hour: machine_type === 40 ? hour_for_query : null,
        counter: machine_type === 40 ? counter : null,
        performance,
      };
    });

    return results;
  }
}
