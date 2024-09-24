import { Public } from '@/common/decorators/is-public.decorator';
import { LocalAuthGuard } from '@/core/guards/local-auth.guard';
import { RegisterAuthDto } from '@/core/models/app/auth/register-auth.dto';
import { AUTH_SERVICE, AuthService } from '@/core/services';
import { Body, Controller, Get, Inject, Post, Req, Res, Session, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(@Inject(AUTH_SERVICE) private authService: AuthService) { }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async login(@Req() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user, response);
  }

  @Public()
  @Post('sign-up')
  async register(@Body() body: RegisterAuthDto, @Res() response: any) {
    return this.authService.register(body, response);
  }

  @Get('profile')
  getProfile(@Req() req) {
    console.log(req.cookies)
    return {
      data: req.user
    };
  }

  @Get('/sign-out')
  logout(@Session() session: any) {
    return session.jwt = undefined
  }
}
