import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/dto/login.dto';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from './constant';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService,
        private usersService: UserService,

    ) { }

    async login(loginDto: LoginDto): Promise<string> {
        const { email, password } = loginDto;
        const user = await this.usersService.findOneByEmail(email);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
        }

        const payload = { sub: user.id, username: user.email };
        return await this.jwtService.signAsync(payload, { secret: jwtConstants.secret });
    }

    async validateToken(token: string): Promise<any> {
        try {
            const decoded = this.jwtService.verify(token, { secret: jwtConstants.secret });
            if (!decoded) {
                throw new UnauthorizedException('Invalid token');
            }
            return decoded;
        } catch (e) {
            throw new UnauthorizedException('Invalid token', e.message);
        }
    }
}