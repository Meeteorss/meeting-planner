import { Inject, Injectable } from '@nestjs/common';
import { MeetingType, ScheduleMeetingDto } from '../../dto/meeting.dto';

import { InjectionToken } from '../../injection.token';

import { equipByType } from '../../constants/constants';
import { RoomDto } from '../../dto/room.dto';
import { Meeting } from '../../domain/models/meeting.model';
import { EquipmentRepository } from '../../domain/repos/equipment.repo';
import { MeetingRepository } from '../../domain/repos/meeting.repo';
import { RoomRepository } from '../../domain/repos/room.repo';
import { ScheduledMeeting } from '../dtos/schedule.dto';

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
  async schedule(
    meetingDetails: ScheduleMeetingDto,
  ): Promise<ScheduledMeeting> {
    const meeting = new Meeting({
      ...meetingDetails,
      type: MeetingType[meetingDetails.type],
    });

    const rooms = await this.roomRepository.findByMeeting(meeting.details());
    const equips = await this.equipmentRepository.findByIds(
      rooms.map((r) => r.id),
    );

    rooms.forEach((room) => {
      room.equipments = equips.filter((eq) => eq.roomId == room.id);
    });
    console.log('meeting details ', meetingDetails);

    const result = rooms.filter((room) => {
      const hasEquips = equipByType[meetingDetails.type].every((equip) => {
        let equipmentList = room.equipments.map((ele) => ele.name);
        return equipmentList.includes(equip);
      });
      return hasEquips;
    });

    if (result.length) {
      const room = this.optimal(result, meetingDetails);

      meeting.schedule(room);
      const savedMeeting = await this.meetingRepository.save(meeting);

      return {
        ...savedMeeting.details(),
        room: savedMeeting.details().room,
        date: new Date(meeting.details().date).toLocaleDateString(),
      };
    }

    return {
      ...meeting.details(),
      date: new Date(meeting.details().date).toLocaleDateString(),
      room: null,
    };
  }

  private optimal(rooms: RoomDto[], details: ScheduleMeetingDto): RoomDto {
    const roomsWithNoWastedEquipment = rooms.filter((r) => {
      return r.equipments.length == equipByType[details.type].length;
    });
    const roomWithClosestCapacity = roomsWithNoWastedEquipment?.reduce(
      (prev, curr) => {
        return Math.abs(curr.capacity - details.attendees || 3) <
          Math.abs(prev.capacity - details.attendees || 3)
          ? curr
          : prev;
      },
    );
    return roomWithClosestCapacity;
  }
}
