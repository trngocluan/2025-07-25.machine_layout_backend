import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual, DataSource } from 'typeorm';
import { MachineMaster } from '../entities/machine-master.entity';
import { MachineStatusHistory } from '../entities/machine-status-history.entity';
import { ProductionProgress } from '../entities/production-progress.entity';
import e from 'express';

@Injectable()
export class MachineService {
  constructor(
    // Inject DataSource để sử dụng các phương thức truy vấn nâng cao
    private dataSource: DataSource,
    
    // Inject các repository tương ứng với các entity
    @InjectRepository(MachineMaster)
    private machineRepo: Repository<MachineMaster>,

    @InjectRepository(MachineStatusHistory)
    private statusRepo: Repository<MachineStatusHistory>,

    @InjectRepository(ProductionProgress)
    private progressRepo: Repository<ProductionProgress>,
  ) {}

  /**
   * Lấy danh sách máy của nhà máy, bao gồm trạng thái, tọa độ, hiệu suất,...
   * @param factory_type số nhà máy cần lấy (VD: 2 là Mercury)
   */
    async getMachineSummary(factory_type: number) {
        const now = new Date(new Date().getTime() + 7 * 60 * 60 * 1000); // múi giờ Tokyo

        // Tính ngày và giờ tương ứng với ca
        const startOfShift = new Date(now);
        startOfShift.setHours(8, 0, 0, 0);

        let shiftDate: string;
        let hour_for_query: number;

        if (now >= startOfShift) {
            shiftDate = now.toISOString().split('T')[0];
            const diffMs = now.getTime() - startOfShift.getTime();
            const hour = Math.floor(diffMs / (60 * 60 * 1000));
            hour_for_query = hour// - 1; // Giờ hiện tại trừ 1 để lấy giờ trước đó
        } else {
            const yesterday = new Date(now);
            yesterday.setDate(now.getDate() - 1);
            shiftDate = yesterday.toISOString().split('T')[0];
            const startOfYesterday = new Date(yesterday);
            startOfYesterday.setHours(8, 0, 0, 0);
            const diffMs = now.getTime() - startOfYesterday.getTime();
            const hour = Math.floor(diffMs / (60 * 60 * 1000));
            hour_for_query = hour// - 1; // Giờ hiện tại trừ 1 để lấy giờ trước đó
        }

        // ✅ Truy vấn JOIN cả 3 bảng chỉ với 1 query
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

        // ✅ Xử lý dữ liệu trả về theo yêu cầu
        const results = raw.map(row => {
            const machine_type = +row.machine_type;
            const ct = machine_type === 40 ? parseFloat(row.ct) : null;
            const counter = row.counter !== null ? parseInt(row.counter) : null;

            let performance: number | null = null;

            // ✅ Chỉ tính hiệu suất cho máy loại 40, có ct và counter hợp lệ
            if (ct && counter !== null && machine_type === 40 && hour_for_query >= 0) {
                let seconds: number;

                if (hour_for_query < 8) {
                // 👉 Trường hợp trước 08:00 → đang thuộc ca hôm qua
                // → Cần cộng thêm 24 giờ để tính chính xác số giây từ 08:00 hôm qua đến hiện tại
                seconds = (hour_for_query - 8 + 1 + 24) * 3600;
                } else {
                // 👉 Trường hợp đang trong ca hôm nay → giờ hiện tại ≥ 08:00
                // → Tính thời gian từ 08:00 đến khung giờ hiện tại
                seconds = (hour_for_query - 8 + 1) * 3600;
                }

                // ✅ Tính hiệu suất: % = sản lượng / (số giây chạy / ct)
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
