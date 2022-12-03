import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlannerController } from './api/planner.controller';
import { MeetingApiService } from './app/services/meeting.service';
import { MeetingService } from './domain/services/meeting.service';
import { EquipmentEntity } from './infra/entities/equipment.entity';
import { MeetingEntity } from './infra/entities/meeting.entity';
import { RoomEntity } from './infra/entities/room.entity';
import { EquipmentRepositoryImpl } from './infra/repos/equipment.repo';
import { MeetingRepositoryImpl } from './infra/repos/meeting.repo';
import { RoomRepositoryImpl } from './infra/repos/room.repo';
import { InjectionToken } from './injection.token';
import { RoomSeeder } from './utils/room.seed';
const infrastructure: Provider[] = [
  {
    provide: InjectionToken.MEETING_REPOSITORY,
    useClass: MeetingRepositoryImpl,
  },
  {
    provide: InjectionToken.ROOM_REPOSITORY,
    useClass: RoomRepositoryImpl,
  },
  {
    provide: InjectionToken.EQUIPMENT_REPOSITORY,
    useClass: EquipmentRepositoryImpl,
  },
];
@Module({
  imports: [
    TypeOrmModule.forFeature([RoomEntity, MeetingEntity, EquipmentEntity]),
  ],

  controllers: [PlannerController],
  providers: [MeetingService, MeetingApiService, ...infrastructure, RoomSeeder],
})
export class PlannerModule {}
