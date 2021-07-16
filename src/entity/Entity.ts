import { Default } from './Default'
import {
  Entity as TypeOrmEntity,
  Column,
  OneToOne,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  JoinTable,
} from 'typeorm'

import { Property } from './Property'
import { Relationship } from './Relationship'

@TypeOrmEntity()
export class Entity extends Default {

  // Entity.properties
  @Column()
  name: string

  // Entity.relationships
  @OneToMany(() => Property, property => property.entity)
  properties: Property[]

  @OneToMany(() => Relationship, relationship => relationship.fromEntity)
  relationships: Relationship[]

  @OneToMany(() => Relationship, relationship => relationship.toEntity)
  inverseRelationships: Relationship[]

}
