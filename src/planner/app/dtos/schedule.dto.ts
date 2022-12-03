import { MeetingType } from '../../dto/meeting.dto';
import { RoomDto } from '../../dto/room.dto';
import { Data, ErrorType } from './base.dto';
export const NO_ROOM_AVAILABLE = 'No room available for now';
export type ScheduleRequestDto = {
  date: string;
  type: string;
  attendees?: number;
};

export type ScheduledMeeting = {
  date: string;
  type: MeetingType;
  attendees?: number;
  room: RoomDto;
};
export type ScheduleResponseDto = {
  data: ScheduledMeeting;
  errors: ErrorType[];
};
