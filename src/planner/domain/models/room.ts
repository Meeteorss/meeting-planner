import { Equipment } from './equipment';

export type Room = {
  id: number;
  name: string;
  capacity: number;
  equipments?: Equipment[];
};
