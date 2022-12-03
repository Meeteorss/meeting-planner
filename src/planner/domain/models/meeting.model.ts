import { CreateMeetingDto, MeetingType } from '../../dto/meeting.dto';
import { generate } from 'short-uuid';
export type Room = {
  id: number;
  name: string;
  capacity: number;
};
export type MeetingDetails = {
  id: string;
  date: number;
  hour: number;
  type: MeetingType;
  attendees: number;
  room?: Room;
};

export interface IMeeting {
  details: () => MeetingDetails;
  schedule: (room: Room) => void;
}

export class Meeting implements IMeeting {
  private id: string;
  private date: number;
  private hour: number;
  private type: MeetingType;
  private attendees: number;
  private room?: Room;
  constructor(dto: CreateMeetingDto) {
    this.id = dto.id || generate();
    this.date = dto.date.getTime();
    this.hour = dto.date.getHours();
    this.type = dto.type;
    this.attendees = !dto.attendees || dto.attendees < 3 ? 3 : dto.attendees;
  }

  details(): MeetingDetails {
    return {
      id: this.id,
      date: this.date,
      hour: this.hour,
      attendees: this.attendees,
      type: this.type,
      room: this.room,
    };
  }
  schedule(room: Room) {
    this.room = room;
  }
}
