import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Event } from './event.entity';
import { User } from './user.entity';

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.reservations)
    user: User;

    @ManyToOne(() => Event, event => event.reservations)
    event: Event;

    @Column()
    reservationDate: Date;
}
