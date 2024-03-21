import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column('text')
    description: string;

    @Column()
    date: Date;

    @Column()
    location: string;

    @Column('int')
    capacity: number;

    @OneToMany(() => Reservation, reservation => reservation.event)
    reservations: Reservation[];
}
