import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OwnerType } from '../models/owner-type.enum';
import { ResourceType } from '../models/resource-type.enum';

@Entity({ name: 'resources' })
export class ResourceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ownerId: string;

  @Column({
    type: 'enum',
    enum: OwnerType,
  })
  ownerType: OwnerType;

  @Column({
    type: 'enum',
    enum: ResourceType,
  })
  type: ResourceType;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  amount: number;

  @Column({
    type: 'numeric',
    precision: 3,
    scale: 2,
    nullable: true,
  })
  receivingProbability: number;

  @Column({
    type: 'numeric',
    precision: 3,
    scale: 2,
    nullable: true,
  })
  rarenessProbability: number;

  @Check(`"receivingProbability" >= 0 AND "receivingProbability" <= 1`)
  receivingProbabilityRange: boolean;

  @Check(`"rarenessProbability" >= 0 AND "rarenessProbability" <= 1`)
  rarenessProbabilityRange: boolean;

  @Column({
    type: 'json',
    nullable: true,
  })
  extraArgs: Record<string, any>;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
