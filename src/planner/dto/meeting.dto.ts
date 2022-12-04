import { Room } from '../domain/models/room';

export class CreateMeetingDto {
  id?: string;
  date: string;
  type: string;
  attendees?: number;
  room?: Room;
}
export enum MeetingType {
  VC = 'VC',
  SPEC = 'SPEC',
  RS = 'RS',
  RC = 'RC',
}
