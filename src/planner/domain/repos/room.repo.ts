import { CreateMeetingDto } from 'src/planner/dto/meeting.dto';
import { RoomDto } from '../../dto/room.dto';
import { MeetingDetails } from '../models/meeting.model';

export interface RoomRepository {
  findByMeeting: (meeting: MeetingDetails) => Promise<RoomDto[]>;
}
