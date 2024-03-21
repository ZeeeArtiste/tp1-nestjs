import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly authService: AuthService) {
    }

    async use(req: Request, res: Response, next: NextFunction) {
        const authHeaders = req.headers.authorization;
        if (!authHeaders) {
            throw new UnauthorizedException('Authorization header is missing.');
        }

        const [bearer, token] = authHeaders.split(' ');

        if (bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException('Invalid authorization header.');
        }

        try {
            const user = await this.authService.decodeToken(token);
            if (!user) {
                throw new UnauthorizedException('Invalid token or token expired.');
            }
            req['user'] = user;

            next();
        } catch (error) {
            throw new UnauthorizedException('Unauthorized access.', error.message);
        }
    }
}
