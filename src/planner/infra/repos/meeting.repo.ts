import { InjectRepository } from '@nestjs/typeorm';
import { Meeting } from '../../domain/models/meeting.model';
import { MeetingRepository } from '../../domain/repos/meeting.repo';
import { Repository } from 'typeorm';
import { MeetingEntity } from '../entities/meeting.entity';
import { CreateMeetingDto, MeetingType } from '../../dto/meeting.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MeetingRepositoryImpl implements MeetingRepository {
  constructor(
    @InjectRepository(MeetingEntity)
    private readonly meetingRepository: Repository<MeetingEntity>,
  ) {}
  async save(meeting: Meeting): Promise<Meeting> {
    const entity = new MeetingEntity();
    entity.id = meeting.details().id;
    entity.attendees = meeting.details().attendees;
    entity.date = meeting.details().date;
    entity.hour = meeting.details().hour;
    entity.type = meeting.details().type.toString();
    entity.room = meeting.details().room;
    const model = this.entityToModel(await this.meetingRepository.save(entity));
    return model;

    // await this.meetingRepository.delete({});
    // return null;
  }
  findMeetingByRoomAndDate: (
    roomId: number,
    date: Date,
    hour: number,
  ) => Promise<Meeting>;

  private modelToEntity(model: Meeting): MeetingEntity {
    const details = model.details();
    return {
      ...details,
      type: details.type.toString(),
      room: null,
    };
  }
  private entityToModel(entity: MeetingEntity): Meeting {
    const args: CreateMeetingDto & { id: string } = {
      id: entity.id,
      date: new Date(entity.date).toLocaleDateString(),
      type: MeetingType[entity.type],
      attendees: entity.attendees,
    };
    return new Meeting(args);
  }
}
