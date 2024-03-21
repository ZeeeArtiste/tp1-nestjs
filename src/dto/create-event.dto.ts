import { IsString, IsNotEmpty, IsInt, Min, IsDateString } from 'class-validator';

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsDateString()
    @IsNotEmpty()
    date: Date;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsInt()
    @Min(1)
    capacity: number;
}
