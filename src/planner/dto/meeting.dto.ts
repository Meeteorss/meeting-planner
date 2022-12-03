export class CreateMeetingDto {
  id?: string;
  date: string;
  type: string;
  attendees?: number;
}
export enum MeetingType {
  VC = 'VC',
  SPEC = 'SPEC',
  RS = 'RS',
  RC = 'RC',
}
