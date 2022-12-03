import { MeetingDetails } from '../models/meeting.model';
import { Room } from '../models/room';

export interface RoomRepository {
  findByMeeting: (meeting: MeetingDetails) => Promise<Room[]>;
}
