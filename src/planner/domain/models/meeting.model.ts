import { CreateMeetingDto, MeetingType } from '../../dto/meeting.dto';
import { generate } from 'short-uuid';
import {
  COVID_CAPACITY_MODIFIER,
  equipByType,
} from '../../constants/constants';
import { Room } from './room';
import {
  INVALID_ATTENDEES_NUMBER_ERROR,
  INVALID_DATE_ERROR,
  INVALID_HOUR_ERROR,
  INVALID_TYPE_ERROR,
  NO_AVAILABLE_ROOM_ERROR,
} from '../../constants/errors';

export type MeetingDetails = {
  id: string;
  date: number;
  hour: number;
  type: string;
  attendees: number;
  room?: Room;
};

export interface IMeeting {
  details: () => MeetingDetails;
  schedule: (room: Room[]) => void;
  capacityNeeded: () => number;
}

export class Meeting implements IMeeting {
  private id: string;
  private date: number;
  private type: string;
  private attendees: number;
  private room: Room;
  constructor(args: CreateMeetingDto) {
    this.validate(args);
    this.id = args.id || generate();
    this.date = new Date(args.date).getTime();
    this.room = args.room;
    this.type = args.type;
    this.attendees = !args.attendees || args.attendees < 3 ? 3 : args.attendees;
  }

  details(): MeetingDetails {
    return {
      id: this.id,
      date: this.date,
      hour: new Date(this.date).getHours(),
      attendees: this.attendees,
      type: this.type,
      room: this.room,
    };
  }
  capacityNeeded(): number {
    return (
      (!this.attendees || this.attendees < 3 ? 3 : this.attendees) *
      COVID_CAPACITY_MODIFIER
    );
  }
  schedule(rooms: Room[]) {
    // filetring the rooms by equipments needed... it should be done by the repo or a room service normally but ...
    const availableRooms = rooms.filter((room) => {
      if (this.type === MeetingType.RS) {
        return true;
      }
      const hasEquips = equipByType[this.type].every((equip) => {
        let equipmentList = room.equipments.map((ele) => ele.name);
        return equipmentList.includes(equip);
      });
      return hasEquips;
    });

    if (!availableRooms.length) {
      throw NO_AVAILABLE_ROOM_ERROR;
    }
    const optimal = this.optimal(availableRooms);

    this.room = optimal;
  }
  private optimal(rooms: Room[]): Room {
    let roomsWithNoWastedEquipment: Room[];
    if (this.type === MeetingType.RS) {
      roomsWithNoWastedEquipment = rooms.sort((a, b) =>
        a.capacity > b.capacity ? 1 : -1,
      );
    } else {
      roomsWithNoWastedEquipment = rooms.filter((r) => {
        return r.equipments.length == equipByType[this.type].length;
      });
    }

    const roomWithClosestCapacity = roomsWithNoWastedEquipment?.reduce(
      (prev, curr) => {
        return Math.abs(curr.capacity - this.attendees) <
          Math.abs(prev.capacity - this.attendees)
          ? curr
          : prev;
      },
    );
    return roomWithClosestCapacity;
  }

  private validate(args: CreateMeetingDto) {
    if (args.attendees < 0 || !Number.isInteger(args.attendees)) {
      console.log('Error: ', INVALID_ATTENDEES_NUMBER_ERROR.message);

      throw INVALID_ATTENDEES_NUMBER_ERROR;
    }
    if (!new Date(args.date)) {
      console.log('Error: ', INVALID_DATE_ERROR.message);

      throw INVALID_DATE_ERROR;
    }
    if (
      new Date(args.date).getHours() < 8 ||
      new Date(args.date).getHours() > 20
    ) {
      console.log(
        'Error: ',
        INVALID_HOUR_ERROR.message,

        args.date,
      );

      throw INVALID_HOUR_ERROR;
    }
    if (!Object.values(MeetingType).includes(MeetingType[args.type])) {
      console.log('Error: ', INVALID_TYPE_ERROR.message);

      throw INVALID_TYPE_ERROR;
    }
  }
}
