import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from 'src/dto/create-reservation.dto';

@Controller('/protected-route/reservations')
export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) { }

    @Get()
    findAll() {
        return this.reservationsService.findAll();
    }

    @Post()
    async create(@Body() createReservationDto: CreateReservationDto, @Req() req: Request) {
        const user = req['user'];
        createReservationDto.userId = user.sub as number;
        return this.reservationsService.create(createReservationDto);
    }
}
