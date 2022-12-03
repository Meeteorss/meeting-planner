import { Equipment } from '../models/equipment';

export interface EquipmentRepository {
  findByIds: (ids: number[]) => Promise<Equipment[]>;
}
