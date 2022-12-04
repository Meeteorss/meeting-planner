// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication, Provider } from '@nestjs/common';
// import { PlannerModule } from '../planner.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { MeetingApiService } from '../app/services/meeting.service';
// import { PlannerController } from './planner.controller';
// import { MeetingService } from '../domain/services/meeting.service';
// import { InjectionToken } from '../injection.token';
// import { MeetingRepositoryImpl } from '../infra/repos/meeting.repo';
// import { EquipmentRepositoryImpl } from '../infra/repos/equipment.repo';
// import { RoomRepositoryImpl } from '../infra/repos/room.repo';
// import { Repository } from 'typeorm';
// import { MeetingEntity } from '../infra/entities/meeting.entity';
// import { RoomEntity } from '../infra/entities/room.entity';
// import { EquipmentEntity } from '../infra/entities/equipment.entity';
// import { RoomSeeder } from '../utils/room.seed';
// import { ScheduleRequest } from './sxhedule.request.dto';
// const infrastructure: Provider[] = [
//   {
//     provide: 'MeetingEntityRepository',
//     useClass: Repository<MeetingEntity>,
//   },
//   {
//     provide: 'RoomEntityRepository',
//     useClass: Repository<RoomEntity>,
//   },
//   {
//     provide: 'EquipmentEntityRepository',
//     useClass: Repository<EquipmentEntity>,
//   },
//   {
//     provide: InjectionToken.MEETING_REPOSITORY,
//     useClass: MeetingRepositoryImpl,
//   },
//   {
//     provide: InjectionToken.ROOM_REPOSITORY,
//     useClass: RoomRepositoryImpl,
//   },
//   {
//     provide: InjectionToken.EQUIPMENT_REPOSITORY,
//     useClass: EquipmentRepositoryImpl,
//   },
// ];
// describe('AppController (e2e)', () => {
//   let app: INestApplication;

//   let controller: PlannerController;
//   let seeder: RoomSeeder;
//   let repo: Repository<MeetingEntity>;
//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [
//         PlannerModule,
//         TypeOrmModule.forRoot({
//           type: 'sqlite',
//           database: 'planner-test',
//           entities: [MeetingEntity, RoomEntity, EquipmentEntity],
//           // autoLoadEntities: true,
//           synchronize: true,
//           // logging: true,
//           dropSchema: true,
//         }),
//       ],
//       providers: [
//         RoomSeeder,
//         MeetingApiService,
//         PlannerController,
//         MeetingService,
//         Repository<RoomEntity>,
//         Repository<EquipmentEntity>,
//         Repository<MeetingEntity>,

//         ...infrastructure,
//       ],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     controller = moduleFixture.get<PlannerController>(PlannerController);
//     seeder = moduleFixture.get<RoomSeeder>(RoomSeeder);
//     repo = moduleFixture.get<Repository<MeetingEntity>>(
//       Repository<MeetingEntity>,
//     );
//     // await seeder.delete();
//     await seeder.seed();
//     // await repo.delete({});
//     await app.init();
//   });

//   it('expects controller to be defined', async () => {
//     expect(controller).toBeDefined();
//   });
//   // it('expects controller to return error', async () => {
//   //   const args = new ScheduleRequest('2022-12-5 9:00', 'RS', -2);
//   //   const res = await controller.schedule(args);
//   //   expect(typeof res).toBe('string');
//   // });
//   it('expects controller to return A ScheduleResponse', async () => {
//     const args = new ScheduleRequest('2022-12-5 9:00', 'RS', 2);
//     const res = await controller.schedule(args);
//     console.log('res ', res);

//     expect(typeof res).toBe('ScheduleResponse');
//   });
// });
