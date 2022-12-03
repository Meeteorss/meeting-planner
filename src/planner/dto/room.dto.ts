import { EquipmentDto } from './equipment.dto';

export type RoomDto = {
  id: number;
  name: string;
  capacity: number;
  equipments?: EquipmentDto[];
};
