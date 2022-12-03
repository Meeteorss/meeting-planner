import { EquipmentDto } from 'src/planner/dto/equipment.dto';
import { CreateMeetingDto } from 'src/planner/dto/meeting.dto';
import { Meeting } from '../models/meeting.model';

export interface EquipmentRepository {
  findByIds: (ids: number[]) => Promise<EquipmentDto[]>;
}
