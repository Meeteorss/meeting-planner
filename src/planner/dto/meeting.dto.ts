import { RoomDto } from './room.dto';

export class ScheduleMeetingDto {
  date: Date;
  type: string;
  attendees?: number;
}
export class CreateMeetingDto {
  id?: string;
  date: Date;
  type: MeetingType;
  attendees?: number;
}
export enum MeetingType {
  VC,
  SPEC,
  RS,
  RC,
}
// export type ScheduledMeeting = {
//   date: Date;
//   hour: number;
//   type: MeetingType;
//   attendees?: number;
//   room: RoomDto;
// };
