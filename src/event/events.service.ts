import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventDto } from 'src/dto/create-event.dto';
import { Event } from 'src/entities/event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event)
        private eventsRepository: Repository<Event>,
    ) { }

    findAll(): Promise<Event[]> {
        return this.eventsRepository.find();
    }

    async create(createEventDto: CreateEventDto): Promise<Event> {
        const event = this.eventsRepository.create(createEventDto);
        return this.eventsRepository.save(event);
    }
}

