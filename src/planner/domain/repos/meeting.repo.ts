import { Meeting } from '../models/meeting.model';

export interface MeetingRepository {
  save: (meeting: Meeting) => Promise<Meeting>;
  delete: () => Promise<void>;
  findMeetingByRoomAndDate: (
    roomId: number,
    date: Date,
    hour: number,
  ) => Promise<Meeting | null>;
}
