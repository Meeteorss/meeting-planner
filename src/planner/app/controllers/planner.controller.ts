import { Controller, Post, Body } from '@nestjs/common';
import { RoomSeeder } from '../../utils/room.seed';
import { ScheduleRequestDto, ScheduleResponseDto } from '../dtos/schedule.dto';
import { MeetingService } from '../services/meeting.service';
import { ErrorType } from '../dtos/base.dto';
import { MeetingType } from '../../dto/meeting.dto';

@Controller('/planner')
export class PlannerController {
  constructor(
    private readonly meetingService: MeetingService,
    private readonly seeder: RoomSeeder,
  ) {}

  @Post()
  async schedule(
    @Body() args: ScheduleRequestDto,
  ): Promise<ScheduleResponseDto> {
    // await this.seeder.seed();
    let errors: ErrorType[];
    errors = this.validateScheduleArgs(args);
    if (errors.length) {
      return {
        data: null,
        errors,
      };
    }
    const data = await this.meetingService.schedule({
      ...args,
      date: new Date(args.date),
      type: MeetingType[args.type],
    });
    return await { data, errors };
    // return null;
  }

  private validateScheduleArgs(args: ScheduleRequestDto): ErrorType[] {
    let errors: ErrorType[];
    if (args.attendees < 0) {
      errors = [
        ...errors,
        { field: 'attendees', message: 'Should be positive' },
      ];
    }
    if (!new Date(args.date)) {
      errors = [...errors, { field: 'date', message: 'Invalid Date' }];
    }
    if (new Date(args.date)?.getHours() == 0) {
      errors = [...errors, { field: 'date', message: 'Should precise hour' }];
    }
    if (!Object.values(MeetingType).includes(args.type)) {
      errors = [...errors, { field: 'type', message: 'Invalid Type' }];
    }
    return errors;
  }
}
