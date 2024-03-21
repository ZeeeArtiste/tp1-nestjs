import { IsInt, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateReservationDto {
    @IsInt()
    @IsNotEmpty()
    eventId: number;

    userId: number;

    @IsDateString()
    @IsNotEmpty()
    reservationDate: Date;
}
