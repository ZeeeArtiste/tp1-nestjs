import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReservationDto } from 'src/dto/create-reservation.dto';
import { Event } from 'src/entities/event.entity';
import { Reservation } from 'src/entities/reservation.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationsService {
    constructor(
        @InjectRepository(Reservation)
        private readonly reservationsRepository: Repository<Reservation>,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        @InjectRepository(Event)
        private readonly eventRepo: Repository<Event>,
    ) { }


    async findAll(): Promise<Reservation[]> {
        return this.reservationsRepository.find({ relations: ['event', 'user'] });
    }

    async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
        const reservation = new Reservation();
        reservation.reservationDate = createReservationDto.reservationDate;

        const user = await this.userRepo.findOne({ where: { id: createReservationDto.userId } })

        if (!user) {
            throw new NotFoundException('User not found');
        }
        reservation.user = user;

        const event = await this.eventRepo.findOne({ where: { id: createReservationDto.eventId } });
        if (!event) {
            throw new NotFoundException('Event not found');
        }

        reservation.event = event;

        return this.reservationsRepository.save(reservation);
    }


}
