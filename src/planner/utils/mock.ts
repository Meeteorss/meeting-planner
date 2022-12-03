import { Room } from '../domain/models/room';

export const MOCK_ROOMS: Room[] = [
  {
    id: 1,
    name: 'E1001',
    capacity: 10,
    equipments: [
      {
        id: 1,
        name: 'Tableau',
        room: { id: 1, name: 'E1001', capacity: 10 },
      },
    ],
  },
  {
    id: 2,
    name: 'E1002',
    capacity: 9,
    equipments: [
      {
        id: 1,
        name: 'Tableau',
        room: { id: 2, name: 'E1002', capacity: 9 },
      },
    ],
  },
  {
    id: 3,
    name: 'E1003',
    capacity: 12,
    equipments: [
      {
        id: 1,
        name: 'Ecran',
        room: { id: 3, name: 'E1003', capacity: 12 },
      },
    ],
  },
];
