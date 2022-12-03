import { Meeting } from '../domain/models/meeting.model';
import { Room } from '../domain/models/room';

export class ScheduleResponse {
  id: string;
  date: Date;
  type: string;
  attendees?: number;
  room: Room;
  private constructor(
    id: string,
    date: number,
    type: string,
    attendees: number,
    room: Room,
  ) {
    this.id = id;
    this.date = new Date();
    this.type = type;
    this.attendees = attendees;
    this.room = room;
  }
  static of(meeting: Meeting): ScheduleResponse {
    return new ScheduleResponse(
      meeting.details().id,
      meeting.details().date,
      meeting.details().type,
      meeting.details().attendees,
      meeting.details().room,
    );
  }
}
