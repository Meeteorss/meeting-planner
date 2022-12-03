import { Injectable } from '@nestjs/common';
import { ScheduleRequest } from '../../api/sxhedule.request.dto';
import { ScheduleResponse } from '../../api/schedule.response.dto';
import { MeetingService } from '../../domain/services/meeting.service';

@Injectable()
export class MeetingApiService {
  constructor(private readonly meetingService: MeetingService) {}
  async create(args: ScheduleRequest): Promise<ScheduleResponse> {
    return ScheduleResponse.of(
      await this.meetingService.create(
        args.Date(),
        args.Type(),
        args.Attendees(),
      ),
    );
  }
}
