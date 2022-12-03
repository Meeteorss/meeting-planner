import { Test, TestingModule } from '@nestjs/testing';

import { TypeOrmSQLITETestingModule } from '../../tests/testingModule';
import { MeetingType } from '../../dto/meeting.dto';
import { MeetingService } from './meeting.service';
import { RoomRepository } from '../../domain/repos/room.repo';
import { MeetingRepository } from '../../domain/repos/meeting.repo';
import { EquipmentRepository } from '../../domain/repos/equipment.repo';
import { InjectionToken } from '../../injection.token';
import { PlannerModule } from '../../planner.module';
import { RoomDto } from '../../dto/room.dto';
import { EquipmentDto } from '../../dto/equipment.dto';
import { Meeting } from '../../domain/models/meeting.model';

describe('MeetingService', () => {
  let service: MeetingService;
  let roomRepository: RoomRepository;
  let meetingRepository: MeetingRepository;
  let equipmentRepository: EquipmentRepository;
  const mockRooms = new Promise((resolve, reject) => {
    resolve([
      { id: 1, name: 'E1001', capacity: 10 },
      { id: 2, name: 'E1002', capacity: 12 },
      { id: 3, name: 'E1003', capacity: 7 },
      { id: 4, name: 'E1004', capacity: 11 },
    ]);
  });
  const mockEquips = new Promise((resolve, reject) => {
    resolve([
      { id: 1, name: 'Tableau', roomId: 1 },
      { id: 2, name: 'Ecran', roomId: 2 },
      { id: 3, name: 'Webcam', roomId: 2 },
      { id: 4, name: 'Pieuvre', roomId: 2 },
      { id: 5, name: 'Tableau', roomId: 3 },
      { id: 6, name: 'Tableau', roomId: 4 },
    ]);
  });
  const meeting = new Meeting({
    date: new Date('2022-12-5 9:00'),
    type: MeetingType['VC'],
    attendees: 5,
  });
  meeting.schedule({ id: 2, name: 'E1002', capacity: 12 });

  const mockMeeting = new Promise((resolve, reject) => {
    resolve(meeting);
  });
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MeetingService,
        {
          provide: InjectionToken.ROOM_REPOSITORY,
          useValue: {
            findByMeeting: jest.fn(() => {
              return [
                { id: 1, name: 'E1001', capacity: 10 },
                { id: 2, name: 'E1002', capacity: 12 },
                { id: 3, name: 'E1003', capacity: 7 },
                { id: 4, name: 'E1004', capacity: 11 },
              ];
            }),
          },
        },
        {
          provide: InjectionToken.MEETING_REPOSITORY,
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: InjectionToken.EQUIPMENT_REPOSITORY,
          useValue: {
            findByIds: jest.fn(() => {
              return [
                { id: 1, name: 'Tableau', roomId: 1 },
                { id: 2, name: 'Ecran', roomId: 2 },
                { id: 3, name: 'Webcam', roomId: 2 },
                { id: 4, name: 'Pieuvre', roomId: 2 },
                { id: 5, name: 'Tableau', roomId: 3 },
                { id: 6, name: 'Tableau', roomId: 4 },
              ];
            }),
          },
        },
      ],
      imports: [...TypeOrmSQLITETestingModule(), PlannerModule],
    }).compile();

    service = module.get<MeetingService>(MeetingService);
    roomRepository = module.get<RoomRepository>(InjectionToken.ROOM_REPOSITORY);
    meetingRepository = module.get<MeetingRepository>(
      InjectionToken.MEETING_REPOSITORY,
    );
    equipmentRepository = module.get<EquipmentRepository>(
      InjectionToken.EQUIPMENT_REPOSITORY,
    );
    jest
      .spyOn(roomRepository, 'findByMeeting')
      .mockReturnValue(mockRooms as Promise<RoomDto[]>);
    jest
      .spyOn(equipmentRepository, 'findByIds')
      .mockReturnValue(mockEquips as Promise<EquipmentDto[]>);

    jest
      .spyOn(meetingRepository, 'save')
      .mockReturnValue(mockMeeting as Promise<Meeting>);
  });

  it('dependencies should be defined', () => {
    expect(service).toBeDefined();
    expect(roomRepository).toBeDefined();
    expect(equipmentRepository).toBeDefined();
    expect(meetingRepository).toBeDefined();
  });

  it('should return a scheduled meeting', async () => {
    const response = await service.schedule({
      date: new Date(meeting.details().date),
      type: MeetingType[meeting.details().type],
      attendees: meeting.details().attendees,
    });
    expect(response.room.id).toBe(2);
  });
});
