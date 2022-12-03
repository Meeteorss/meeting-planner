import { CreateMeetingDto } from 'src/planner/dto/meeting.dto';
import { Meeting } from '../models/meeting.model';

export interface MeetingRepository {
  save: (meeting: Meeting) => Promise<Meeting>;
  findMeetingByRoomAndDate: (
    roomId: number,
    date: Date,
    hour: number,
  ) => Promise<Meeting | null>;
}
