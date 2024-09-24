import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from '@/core/services/auth.service.interface';
import { USER_SERVICE, UserService } from '@/core/services/user.service.interface';
import { PublicUserDto } from '@/core/models';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterAuthDto } from '@/core/models/app/auth/register-auth.dto';
import { Request, Response } from 'express';

@Injectable()
export class LocalAuthService implements AuthService {
  constructor(@Inject(USER_SERVICE) private userService: UserService, private jwtService: JwtService) { }

  async validateUser(username: string, pass: string): Promise<PublicUserDto | undefined> {
    const user = await this.userService.findOne(username);

    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        return result;
      }
    }
    return null;
  }

  async register(user: RegisterAuthDto, res: Response) {
    const { password, ...rest } = user

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const createdUser = await this.userService.create({ ...rest, password: hash })

    const payload = { username: createdUser.username, sub: createdUser.id };

    const jwtToken = this.jwtService.sign(payload)

    // return res.cookie('jwt', jwtToken, {
    //   httpOnly: true, // Prevent access via JavaScript
    //   secure: process.env.NODE_ENV === 'production', // Only send cookies over HTTPS in production
    //   sameSite: 'lax', // Helps mitigate CSRF attacks
    // });

    return {
      message: 'registration success',
      access_token: jwtToken,
    };
  }

  async login(user: any, res: Response) {
    const payload = { username: user.username, sub: user.id };
    const jwtToken = this.jwtService.sign(payload)

    // res.cookie("jwt", jwtToken, {
    //   sameSite: "none",
    //   maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    // })

    return {
      message: 'login success',
      access_token: jwtToken,
    };
  }
}
