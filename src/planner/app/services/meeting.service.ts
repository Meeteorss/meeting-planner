import { Inject, Injectable } from '@nestjs/common';
import { ScheduleRequest } from '../../api/sxhedule.request.dto';
import { MeetingService } from '../../domain/services/meeting.service';
import { Meeting } from '../../domain/models/meeting.model';

@Injectable()
export class MeetingApiService {
  constructor(private readonly meetingService: MeetingService) {}
  async create(args: ScheduleRequest): Promise<Meeting> {
    const res = await this.meetingService.create(
      args.date,
      args.type,
      args.attendees,
    );
    return res;
  }
}
