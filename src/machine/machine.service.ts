import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
   * Lấy danh sách máy của nhà máy tương ứng, có tính hiệu suất
   * @param factory_type số nhà máy (VD: 2 là Mercury)
   */
  async getMachineSummary(factory_type: number) {
    // TODO: Bước 5 sẽ viết truy vấn logic tại đây
    return [];
  }
}
