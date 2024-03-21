import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'The name is required' })
    @IsString({ message: 'The name must be a string' })
    readonly name: string;

    @IsNotEmpty({ message: 'The email is required' })
    @IsEmail({}, { message: 'Invalid email' })
    readonly email: string;

    @IsNotEmpty({ message: 'The password is required' })
    @MinLength(8, { message: 'The password is too short. It must be at least 8 characters long' })
    readonly password: string;

}
