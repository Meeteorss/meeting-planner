import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { RoomEntity } from './room.entity';

@Entity()
export class MeetingEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  date: number;

  @Column()
  hour: number;

  @Column()
  type: string;

  @Column()
  attendees: number;

  @ManyToOne(() => RoomEntity)
  room?: RoomEntity;
}
