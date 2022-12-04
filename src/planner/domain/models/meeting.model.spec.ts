import { Test, TestingModule } from '@nestjs/testing';
import { MOCK_ROOMS } from '../../utils/mock';
import { TypeOrmSQLITETestingModule } from '../../tests/testingModule';
import { Meeting } from './meeting.model';
import {
  INVALID_ATTENDEES_NUMBER_ERROR,
  INVALID_DATE_ERROR,
  INVALID_HOUR_ERROR,
  INVALID_TYPE_ERROR,
  NO_AVAILABLE_ROOM_ERROR,
} from '../../constants/errors';

describe('Meeting model', () => {
  let meeting: Meeting;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [],
      imports: [...TypeOrmSQLITETestingModule()],
    }).compile();
  });
  it('should be defined', () => {
    meeting = new Meeting({
      date: '2022-12-5 9:00',
      type: 'VC',
      attendees: 5,
    });
    expect(meeting).toBeDefined();
  });
  it('should throw error of attendees ', () => {
    try {
      meeting = new Meeting({
        date: '2022-12-5 9:00',
        type: 'VC',
        attendees: -9,
      });
    } catch (err) {
      expect(err).toBe(INVALID_ATTENDEES_NUMBER_ERROR);
    }
  });
  it('should throw error of type ', () => {
    try {
      meeting = new Meeting({
        date: '2022-12-5 9:00',
        type: 'VCC',
        attendees: 9,
      });
    } catch (err) {
      expect(err).toBe(INVALID_TYPE_ERROR);
    }
  });
  it('should throw error of date ', () => {
    try {
      meeting = new Meeting({
        date: '2022-12-5aaspko qsq 9:00',
        type: 'VC',
        attendees: 9,
      });
    } catch (err) {
      expect(err).toBe(INVALID_DATE_ERROR);
    }
  });
  it('should throw error of hour ', () => {
    try {
      meeting = new Meeting({
        date: '2022-12-5 5:00',
        type: 'VC',
        attendees: 5,
      });
    } catch (err) {
      expect(err).toBe(INVALID_HOUR_ERROR);
    }
  });
  it('should affect a room to a meeting', () => {
    const rooms = MOCK_ROOMS;
    meeting = new Meeting({
      date: '2022-12-5 8:00',
      type: 'SPEC',
      attendees: 5,
    });
    meeting.schedule(rooms);
    expect(meeting.details().room.id).toBe(2);
  });
  it('should not affect a room to a meeting', () => {
    const rooms = MOCK_ROOMS;
    try {
      meeting = new Meeting({
        date: '2022-12-5 8:00',
        type: 'RC',
        attendees: 5,
      });
      meeting.schedule(rooms);
    } catch (err) {
      expect(err).toBe(NO_AVAILABLE_ROOM_ERROR);
    }
  });
});
