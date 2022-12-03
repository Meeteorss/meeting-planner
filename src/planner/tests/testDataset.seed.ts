import { getConnection } from 'typeorm';
import { EquipmentEntity } from '../infra/entities/equipment.entity';
import { RoomEntity } from '../infra/entities/room.entity';

export const testDatasetSeed = async () => {
  const connection = await getConnection();
  const entityManager = connection.createEntityManager();
  //   const equipment1 = new EquipmentEntity();
  //   equipment1.name = 'Neant';
  entityManager.insert<RoomEntity>(RoomEntity, {
    name: 'E1001',
    capacity: 23,
  });
  const equipment2_1 = new EquipmentEntity();
  equipment2_1.name = 'Ecran';
  entityManager.insert<RoomEntity>(RoomEntity, {
    name: 'E1002',
    capacity: 10,
    equipments: [equipment2_1],
  });
  const equipment3_1 = new EquipmentEntity();
  equipment3_1.name = 'Pieuvre';
  entityManager.insert<RoomEntity>(RoomEntity, {
    name: 'E1003',
    capacity: 8,
    equipments: [equipment3_1],
  });
  const equipment4_1 = new EquipmentEntity();
  equipment4_1.name = 'Tableau';
  entityManager.insert<RoomEntity>(RoomEntity, {
    name: 'E1004',
    capacity: 4,
    equipments: [equipment4_1],
  });
  //   const equipment5_1 = new EquipmentEntity();
  //   equipment4_1.name = 'Tableau';
  entityManager.insert<RoomEntity>(RoomEntity, {
    name: 'E2001',
    capacity: 4,
    // equipments: [equipment4_1],
  });
  const equipment6_1 = new EquipmentEntity();
  equipment6_1.name = 'Ecran';
  const equipment6_2 = new EquipmentEntity();
  equipment6_2.name = 'Webcam';
  entityManager.insert<RoomEntity>(RoomEntity, {
    name: 'E2002',
    capacity: 15,
    equipments: [equipment6_2, equipment6_1],
  });
  //   const equipment7_1 = new EquipmentEntity();
  //   equipment7_1.name = 'Tableau';
  entityManager.insert<RoomEntity>(RoomEntity, {
    name: 'E2003',
    capacity: 7,
    // equipments: [equipment4_1],
  });
  const equipment8_1 = new EquipmentEntity();
  equipment8_1.name = 'Tableau';
  entityManager.insert<RoomEntity>(RoomEntity, {
    name: 'E2004',
    capacity: 9,
    equipments: [equipment8_1],
  });
  const equipment9_1 = new EquipmentEntity();
  equipment8_1.name = 'Ecran';
  const equipment9_2 = new EquipmentEntity();
  equipment8_1.name = 'Webcam';
  const equipment9_3 = new EquipmentEntity();
  equipment8_1.name = 'Pieuvre';
  entityManager.insert<RoomEntity>(RoomEntity, {
    name: 'E3001',
    capacity: 13,
    equipments: [equipment9_1, equipment9_2, equipment9_3],
  });
  //   const equipment10_1 = new EquipmentEntity();
  //   equipment10_1.name = 'Tableau';
  entityManager.insert<RoomEntity>(RoomEntity, {
    name: 'E3002',
    capacity: 8,
    // equipments: [equipment4_1],
  });
  const equipment11_1 = new EquipmentEntity();
  equipment11_1.name = 'Ecran';
  const equipment11_2 = new EquipmentEntity();
  equipment11_2.name = 'Pieuvre';
  entityManager.insert<RoomEntity>(RoomEntity, {
    name: 'E3002',
    capacity: 8,
    equipments: [equipment11_1, equipment11_2],
  });
  //   const equipment12_1 = new EquipmentEntity();
  //   equipment12_1.name = 'Tableau';
  entityManager.insert<RoomEntity>(RoomEntity, {
    name: 'E3004',
    capacity: 4,
    // equipments: [equipment4_1],
  });
};
