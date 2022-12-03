import { MeetingType } from '../../dto/meeting.dto';
import { Meeting } from './meeting.model';

describe('Meeting model', () => {
  let meeting: Meeting;
  beforeEach(() => {
    meeting = new Meeting({
      date: new Date('2022-12-5 9:00'),
      type: MeetingType['VC'],
      attendees: 5,
    });
  });
  it('should be defined', () => {
    expect(meeting).toBeDefined();
  });
  it('should have details defined', () => {
    expect(meeting.details()).toBeDefined();
  });
  it('should not have a room', () => {
    expect(meeting.details().room).toBeUndefined();
  });

  it('should have a room', () => {
    meeting.schedule({ id: 1, capacity: 10, name: 'E1001' });
    expect(meeting.details().room).toBeDefined();
  });
});
