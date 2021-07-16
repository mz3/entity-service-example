import { Default } from './Default'
import { Entity, Column, ManyToOne, OneToOne, JoinColumn, JoinTable } from 'typeorm'
import { Entity as _Entity } from './Entity'

@Entity()
export class Relationship extends Default {
  // properties
  @Column()
  fromKey: string

  @Column()
  toKey: string // 'entity'

  @Column()
  fromType: string // 'OneToMany'

  @Column()
  toType: string // 'ManyToOne'

  // relationships
  @ManyToOne(() => _Entity, (entity) => entity.relationships, { eager: true })
  fromEntity: _Entity // '@entity'

  @ManyToOne(() => _Entity, (entity) => entity.inverseRelationships, { eager: true })
  toEntity: _Entity // '@property'
}
