import { Controller, Post, Body } from '@nestjs/common';
import { RoomSeeder } from '../utils/room.seed';
import { ScheduleRequest } from './sxhedule.request.dto';
import { ScheduleResponse } from './schedule.response.dto';
import { MeetingApiService } from '../app/services/meeting.service';

@Controller('/planner')
export class PlannerController {
  constructor(
    private readonly meetingService: MeetingApiService,
    private readonly seeder: RoomSeeder,
  ) {}

  @Post()
  async schedule(@Body() args: ScheduleRequest): Promise<ScheduleResponse> {
    // await this.seeder.seed();
    try {
      const response = await this.meetingService.create(args);
      return response;
    } catch (err) {
      return err;
    }

    // return null;
  }
}
