import { Default } from './Default'
import { Entity, Column, ManyToOne } from 'typeorm';
import { Entity as _Entity } from './Entity'

@Entity()
export class Property extends Default {
  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  unique: boolean;

  @Column({ nullable: true })
  nullable: boolean;

  @ManyToOne(() => _Entity, entity => entity.properties)
  entity: _Entity;
}
