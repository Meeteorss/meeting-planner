import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MeetingDetails } from '../../domain/models/meeting.model';
import { RoomRepository } from '../../domain/repos/room.repo';

import { RoomDto } from '../../dto/room.dto';
import { Repository } from 'typeorm';
import { MeetingEntity } from '../entities/meeting.entity';
import { RoomEntity } from '../entities/room.entity';
import { COVID_CAPACITY_MODIFIER, TWO_HOURS } from '../../constants/constants';
@Injectable()
export class RoomRepositoryImpl implements RoomRepository {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
  ) {}
  async findByMeeting(meeting: MeetingDetails): Promise<RoomDto[]> {
    const capacity = meeting.attendees / COVID_CAPACITY_MODIFIER;
    const entities = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect(MeetingEntity, 'meeting', 'meeting.roomId = room.id')
      .where(`room.capacity >= ${capacity}`)
      .andWhere(
        `room.id NOT IN(SELECT "roomId" FROM  'meeting_entity' as meeting  WHERE meeting.date < ${
          new Date(meeting.date).getTime() + TWO_HOURS
        } AND meeting.date > ${new Date(meeting.date).getTime() - TWO_HOURS} )`,
      )
      .getMany();

    const result: RoomDto[] = entities.map((entity) => {
      return {
        id: entity.id,
        capacity: entity.capacity,
        name: entity.name,
      };
    });
    return result;
  }
}
