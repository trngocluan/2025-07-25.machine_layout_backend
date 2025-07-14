import { Controller, Get, Query } from '@nestjs/common';
import { MachineService } from './machine.service';

@Controller('machine')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  /**
   * API: /machine?factory=2
   * Trả về danh sách máy, trạng thái, vị trí, hiệu suất,...
   */
  @Get()
  async getMachines(@Query('factory') factory: number) {
    return this.machineService.getMachineSummary(factory);
  }
}
