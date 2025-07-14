import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual } from 'typeorm';
import { MachineMaster } from '../entities/machine-master.entity';
import { MachineStatusHistory } from '../entities/machine-status-history.entity';
import { ProductionProgress } from '../entities/production-progress.entity';

@Injectable()
export class MachineService {
  constructor(
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
    const now = new Date();

    // ✅ Xác định mốc 08:00:00 sáng của ngày hiện tại
    const startOfShift = new Date(now);
    startOfShift.setHours(8, 0, 0, 0);

    let shiftDate: string;
    let hour_for_query: number;

    if (now >= startOfShift) {
      // Nếu hiện tại >= 08:00 → ca ngày hôm nay
      shiftDate = now.toISOString().split('T')[0];

      const diffMs = now.getTime() - startOfShift.getTime();
      const hour = Math.floor(diffMs / (60 * 60 * 1000));
      hour_for_query = hour - 1;
    } else {
      // Nếu hiện tại < 08:00 → ca thuộc ngày hôm qua
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      shiftDate = yesterday.toISOString().split('T')[0];

      const startOfYesterdayShift = new Date(yesterday);
      startOfYesterdayShift.setHours(8, 0, 0, 0);

      const diffMs = now.getTime() - startOfYesterdayShift.getTime();
      const hour = Math.floor(diffMs / (60 * 60 * 1000));
      hour_for_query = hour - 1;
    }

    // ✅ Lấy toàn bộ danh sách thiết bị của nhà máy
    const machines = await this.machineRepo.find({
      where: { factory_type },
    });

    // khai báo rõ kiểu dữ liệu mà mảng result sẽ chứa
    const result: {
    machine_no: number;
    x: number | null;
    y: number | null;
    status: number | null;
    ct: number | null;
    machine_type: number;
    hour: number | null;
    counter: number | null;
    performance: number | null;
    }[] = [];

    for (const machine of machines) {
      const { machine_no, machine_type, ct } = machine;

      // 🔍 Lấy trạng thái + tọa độ từ bảng A
      const statusRecord = await this.statusRepo.findOne({
        where: { factory_type, machine_no },
      });

      // Mặc định null cho các máy không phải loại 40
      let counter: number | null = null;
      let performance: number | null = null;
      let hour: number | null = null;

      // ✅ Chỉ tính hiệu suất nếu là máy loại 40 và có giờ hợp lệ
      if (machine_type === 40 && hour_for_query >= 0) {
        const progress = await this.progressRepo.findOne({
          where: {
            machine_no,
            date: shiftDate,
            hour: hour_for_query,
          },
        });

        if (progress) {
          counter = progress.counter;
          hour = hour_for_query;

          // Số giây chạy từ 08:00 → now
          const seconds = (hour + 1) * 3600;

          // Tính hiệu suất nếu có CT
          performance = ct ? +(counter / (seconds / ct)).toFixed(1) : null;
        }
      }

      result.push({
        machine_no,
        x: statusRecord?.x ?? null,
        y: statusRecord?.y ?? null,
        status: statusRecord?.status ?? null,
        ct: machine_type === 40 ? ct : null,
        machine_type,
        hour,
        counter,
        performance,
      });
    }

    return result;
  }
}
