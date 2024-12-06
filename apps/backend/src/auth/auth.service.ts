import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/entities/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/entities/users/dto/create-user.dto';
import { User } from 'src/entities/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async signIn(
    username: string,
    pass: string,
    response: Response,
  ): Promise<string> {
    const user = await this.usersService.findOne(username);
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload = { sub: user.id, username: user.username };
    const token = await this.jwtService.signAsync(payload);
    const isProduction =
      this.configService.get('HEROKU_DATABASE_URL') !== undefined;
    response.cookie('access_token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      sameSite: isProduction ? 'none' : 'strict',
      secure: isProduction ? true : undefined,
    });

    return 'Logged in succesfully';
  }

  async signUp(signUpDto: CreateUserDto): Promise<User> {
    const checkIfUserExist = await this.usersService.findOne(
      signUpDto.username,
    );

    if (checkIfUserExist) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

    const user = new User();
    user.username = signUpDto.username;
    user.name = signUpDto.name;
    user.email = signUpDto.email;
    user.password = hashedPassword;

    return await this.userRepository.save(user);
  }

  async signOut(response: Response): Promise<string> {
    const isProduction =
      this.configService.get('HEROKU_DATABASE_URL') !== undefined;

    response.cookie('access_token', '', {
      httpOnly: true,
      maxAge: 0,
      sameSite: isProduction ? 'none' : 'strict',
      secure: isProduction ? true : undefined,
    });
    return 'Logged out succesfully';
  }
}
