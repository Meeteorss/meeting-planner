import { Inject, Injectable } from '@nestjs/common';
import { InjectionToken } from '../../injection.token';
import { Meeting } from '../../domain/models/meeting.model';
import { EquipmentRepository } from '../../domain/repos/equipment.repo';
import { MeetingRepository } from '../../domain/repos/meeting.repo';
import { RoomRepository } from '../../domain/repos/room.repo';

@Injectable()
export class MeetingService {
  constructor(
    @Inject(InjectionToken.MEETING_REPOSITORY)
    private readonly meetingRepository: MeetingRepository,
    @Inject(InjectionToken.ROOM_REPOSITORY)
    private readonly roomRepository: RoomRepository,
    @Inject(InjectionToken.EQUIPMENT_REPOSITORY)
    private readonly equipmentRepository: EquipmentRepository,
  ) {}
  async create(
    date: string,
    type: string,
    attendees: number,
  ): Promise<Meeting> {
    const meeting = new Meeting({
      date,
      type,
      attendees,
    });

    const rooms = await this.roomRepository.findByMeeting({
      ...meeting.details(),
      attendees: meeting.capacityNeeded(),
    });
    if (!rooms.length) {
      throw new Error('No available room');
    }
    const equips = await this.equipmentRepository.findByIds(
      rooms.map((r) => r.id),
    );

    rooms.forEach((room) => {
      room.equipments = equips.filter((eq) => eq.room.id == room.id);
    });

    meeting.schedule(rooms);

    return await this.meetingRepository.save(meeting);
  }
}
