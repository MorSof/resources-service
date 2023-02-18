import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ResourceTypesEnum } from '../core/resources/models/resourceTypes.enum';
import { CurrencyNamesEnum } from '../core/resources/models/currencyNamesEnum';

@Entity({ name: 'resources' })
export class ResourceEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: 'enum',
    enum: ResourceTypesEnum,
  })
  type: ResourceTypesEnum;

  @Column()
  name: CurrencyNamesEnum;

  @Column()
  amount: number;

  @Column()
  ownerType: string;

  @Column()
  ownerId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  beforeInsert() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date();
  }

  constructor(partial: Partial<ResourceEntity>) {
    Object.assign(this, partial);
  }
}
