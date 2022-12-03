import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentEntity } from '../infra/entities/equipment.entity';
import { MeetingEntity } from '../infra/entities/meeting.entity';
import { RoomEntity } from '../infra/entities/room.entity';

export const TypeOrmSQLITETestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    entities: [MeetingEntity, RoomEntity, EquipmentEntity],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([MeetingEntity, RoomEntity, EquipmentEntity]),
];
