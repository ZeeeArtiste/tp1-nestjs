import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/dto/create-user-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {

        const isExist = await this.userRepository.findOne({ where: { email: createUserDto.email } });
        if (isExist) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const { password, ...rest } = createUserDto;
        const hashedPassword = await this.hashPassword(password);
        const user = this.userRepository.create({ password: hashedPassword, ...rest });
        return this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { id } });
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { email } });
    }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

}
