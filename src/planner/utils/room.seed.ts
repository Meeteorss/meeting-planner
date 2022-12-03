import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EquipmentEntity } from '../infra/entities/equipment.entity';
import { RoomEntity } from '../infra/entities/room.entity';
@Injectable()
export class RoomSeeder {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
  ) {}
  async seed() {
    const equipment2_1 = new EquipmentEntity();
    equipment2_1.name = 'Ecran';
    const equipment3_1 = new EquipmentEntity();
    equipment3_1.name = 'Pieuvre';
    const equipment4_1 = new EquipmentEntity();
    equipment4_1.name = 'Tableau';
    const equipment6_1 = new EquipmentEntity();
    equipment6_1.name = 'Ecran';
    const equipment6_2 = new EquipmentEntity();
    equipment6_2.name = 'Webcam';
    const equipment8_1 = new EquipmentEntity();
    equipment8_1.name = 'Tableau';
    const equipment9_1 = new EquipmentEntity();
    equipment9_1.name = 'Ecran';
    const equipment9_2 = new EquipmentEntity();
    equipment9_2.name = 'Webcam';
    const equipment9_3 = new EquipmentEntity();
    equipment9_3.name = 'Pieuvre';
    const equipment11_1 = new EquipmentEntity();
    equipment11_1.name = 'Ecran';
    const equipment11_2 = new EquipmentEntity();
    equipment11_2.name = 'Pieuvre';

    this.roomRepository.save([
      {
        name: 'E1001',
        capacity: 23,
      },
      {
        name: 'E1002',
        capacity: 10,
        equipments: [equipment2_1],
      },
      {
        name: 'E1003',
        capacity: 8,
        equipments: [equipment3_1],
      },
      {
        name: 'E1004',
        capacity: 4,
        equipments: [equipment4_1],
      },
      {
        name: 'E2001',
        capacity: 4,
        // equipments: [equipment4_1],
      },
      {
        name: 'E2002',
        capacity: 15,
        equipments: [equipment6_2, equipment6_1],
      },
      {
        name: 'E2003',
        capacity: 7,
        // equipments: [equipment4_1],
      },
      {
        name: 'E2004',
        capacity: 9,
        equipments: [equipment8_1],
      },
      {
        name: 'E3001',
        capacity: 13,
        equipments: [equipment9_1, equipment9_2, equipment9_3],
      },
      {
        name: 'E3002',
        capacity: 8,
        // equipments: [equipment4_1],
      },
      {
        name: 'E3003',
        capacity: 8,
        equipments: [equipment11_1, equipment11_2],
      },
      {
        name: 'E3004',
        capacity: 4,
        // equipments: [equipment4_1],
      },
    ]);
  }
}
