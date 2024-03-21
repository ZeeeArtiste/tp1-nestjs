import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { Reservation } from 'src/entities/reservation.entity';
import { Event } from 'src/entities/event.entity';
import { User } from 'src/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Reservation, Event, User])],
    controllers: [ReservationsController],
    providers: [ReservationsService],
})
export class ReservationsModule { }
