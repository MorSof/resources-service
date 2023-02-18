import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { LevelEntity } from './level.entity';

@Entity({ name: 'user_levels' })
export class UserLevelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stars: number;

  @Column()
  userId: string;

  @Column()
  levelId: number;

  @ManyToOne(() => UserEntity, (user) => user.userLevels)
  user: UserEntity;

  @ManyToOne(() => LevelEntity, (level) => level.userLevels)
  level: LevelEntity;

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

  constructor(partial: Partial<UserLevelEntity>) {
    Object.assign(this, partial);
  }
}
