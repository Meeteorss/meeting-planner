import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EquipmentEntity } from './equipment.entity';
import { MeetingEntity } from './meeting.entity';

@Entity()
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  capacity: number;
  @OneToMany(() => EquipmentEntity, (equipment) => equipment.room, {
    cascade: true,
    nullable: true,
  })
  equipments?: EquipmentEntity[];
}
