import { Test, TestingModule } from '@nestjs/testing';

import { TypeOrmSQLITETestingModule } from '../../tests/testingModule';
import { MeetingType } from '../../dto/meeting.dto';

import { RoomRepository } from '../../domain/repos/room.repo';
import { MeetingRepository } from '../../domain/repos/meeting.repo';
import { MeetingService } from '../../domain/services/meeting.service';
import { MeetingApiService } from './meeting.service';
import { InjectionToken } from '../../injection.token';
import { Meeting } from '../../domain/models/meeting.model';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { ScheduleRequest } from '../../api/sxhedule.request.dto';

const moduleMocker = new ModuleMocker(global);

describe('MeetingApiService', () => {
  let appService: MeetingApiService;
  let domainService: MeetingService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MeetingApiService,
        MeetingService,
        {
          provide: InjectionToken.MEETING_REPOSITORY,
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: InjectionToken.ROOM_REPOSITORY,
          useValue: {
            findByMeeting: jest.fn(),
          },
        },
        {
          provide: InjectionToken.EQUIPMENT_REPOSITORY,
          useValue: {
            save: jest.fn(),
          },
        },
      ],
      imports: [...TypeOrmSQLITETestingModule()],
    })
      // .useMocker((token) => {
      //   const res = new Meeting({
      //     date: '2022-12-5 9:00',
      //     type: 'VC',
      //     attendees: 10,
      //     id: '123',
      //   });
      //   console.log('TOKEN ', token);

      //   if (token === MeetingService) {
      //     return { create: jest.fn().mockReturnValue(res) };
      //   }
      //   if (typeof token === 'function') {
      //     const mockMetadata = moduleMocker.getMetadata(
      //       token,
      //     ) as MockFunctionMetadata<any, any>;
      //     const Mock = moduleMocker.generateFromMetadata(mockMetadata);
      //     return new Mock();
      //   }
      // })
      .compile();

    appService = module.get<MeetingApiService>(MeetingApiService);
    domainService = module.get<MeetingService>(MeetingService);
    jest.spyOn(domainService, 'create').mockResolvedValue(
      new Meeting({
        date: '2022-12-5 9:00',
        type: 'VC',
        attendees: 10,
        id: '123',
      }),
    );
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
  });

  it('should return a ScheduleResponse', async () => {
    const res = await appService.create(
      new ScheduleRequest('2022-12-5 9:00', 'VC', 10),
    );
    expect(res.details().id).toBe('123');
  });
});
