import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Reservation } from './reservation.entity';

@Unique('unique_email', ['email'])
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 100 })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Reservation, reservation => reservation.user)
    reservations: Reservation[];
}
