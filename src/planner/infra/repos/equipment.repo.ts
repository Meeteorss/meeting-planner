import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EquipmentRepository } from '../../domain/repos/equipment.repo';
import { EquipmentDto } from '../../dto/equipment.dto';
import { In, Repository } from 'typeorm';
import { EquipmentEntity } from '../entities/equipment.entity';

@Injectable()
export class EquipmentRepositoryImpl implements EquipmentRepository {
  constructor(
    @InjectRepository(EquipmentEntity)
    private readonly equipmentRepository: Repository<EquipmentEntity>,
  ) {}
  async findByIds(ids: number[]): Promise<EquipmentDto[]> {
    const equips = await this.equipmentRepository.find({
      where: { room: In(ids) },
      relations: { room: true },
    });
    const result: EquipmentDto[] = equips.map((e) => {
      return {
        id: e.id,
        name: e.name,
        roomId: e.room.id,
      };
    });
    return result;
  }
}
