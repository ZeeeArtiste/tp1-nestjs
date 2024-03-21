import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { EventService } from './events.service';
import { CreateEventDto } from 'src/dto/create-event.dto';

@Controller('events')
export class EventController {
    constructor(private readonly eventsService: EventService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createEventDto: CreateEventDto) {
        return this.eventsService.create(createEventDto);
    }

    @Get()
    findAll() {
        return this.eventsService.findAll();
    }
}
