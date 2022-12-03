import { CreateMeetingDto, MeetingType } from '../../dto/meeting.dto';
import { generate } from 'short-uuid';
import { equipByType } from '../../constants/constants';
import { Room } from './room';

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
  schedule(rooms: Room[]) {
    const availableRooms = rooms.filter((room) => {
      const hasEquips = equipByType[this.type].every((equip) => {
        let equipmentList = room.equipments.map((ele) => ele.name);
        return equipmentList.includes(equip);
      });
      return hasEquips;
    });
    if (!availableRooms.length) {
      throw new Error('No available room');
    }
    const optimal = this.optimal(availableRooms);
    this.room = optimal;
  }
  private optimal(rooms: Room[]): Room {
    const roomsWithNoWastedEquipment = rooms.filter((r) => {
      return r.equipments.length == equipByType[this.type].length;
    });
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
      throw new Error('Invalid number of attendees');
    }
    if (!new Date(args.date)) {
      throw new Error('Invalid date');
    }
    if (
      new Date(args.date)?.getHours() < 8 ||
      new Date(args.date)?.getHours() > 20
    ) {
      throw new Error('Invalid hour');
    }
    if (!Object.values(MeetingType).includes(MeetingType[args.type])) {
      throw new Error('Invalid type');
    }
  }
}
