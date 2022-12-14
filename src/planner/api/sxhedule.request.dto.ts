export class ScheduleRequest {
  date: string;
  type: string;
  attendees: number;
  constructor(date: string, type: string, attendees: number) {
    this.date = date;
    this.type = type;
    this.attendees = attendees;
  }
  Date(): string {
    return this.date;
  }
  Type(): string {
    return this.type;
  }
  Attendees(): number {
    return this.attendees;
  }
}
