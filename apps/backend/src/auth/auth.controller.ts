import { CreateUserDto } from 'src/entities/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Request,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: { username:string, password:string }, @Res({passthrough: true}) response: Response) {
    return this.authService.signIn(signInDto.username, signInDto.password, response);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async signOut(@Res({passthrough: true}) response: Response) {
    return this.authService.signOut(response);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body() signUpDto: CreateUserDto) {
    return this.authService.signUp(signUpDto);
  }

  @Get('check-auth')
  getProfile(@Request() req) {
    if (!req.user) {
        throw new UnauthorizedException('User not authenticated');
    }
    return req.user;
  }
}
