import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';


@Module({
    imports: [TypeOrmModule.forFeature([User]), JwtModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UsersModule { }
