import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EquipmentRepository } from '../../domain/repos/equipment.repo';

import { In, Repository } from 'typeorm';
import { EquipmentEntity } from '../entities/equipment.entity';
import { Equipment } from '../../domain/models/equipment';

@Injectable()
export class EquipmentRepositoryImpl implements EquipmentRepository {
  constructor(
    @InjectRepository(EquipmentEntity)
    private readonly equipmentRepository: Repository<EquipmentEntity>,
  ) {}
  async findByIds(ids: number[]): Promise<Equipment[]> {
    const equips = await this.equipmentRepository.find({
      where: { room: In(ids) },
      relations: { room: true },
    });
    const result: Equipment[] = equips.map((e) => {
      return {
        id: e.id,
        name: e.name,
        room: e.room,
      };
    });
    return result;
  }
}
