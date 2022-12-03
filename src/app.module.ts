import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EquipmentEntity } from './planner/infra/entities/equipment.entity';
import { MeetingEntity } from './planner/infra/entities/meeting.entity';
import { RoomEntity } from './planner/infra/entities/room.entity';

import { PlannerModule } from './planner/planner.module';

@Module({
  imports: [
    PlannerModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'planner',
      // entities: [RoomEntity, MeetingEntity, EquipmentEntity],
      autoLoadEntities: true,
      synchronize: true,
      // logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
