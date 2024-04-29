import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto/users.dto';
import { Public } from './public-strategy';
import { AuthStrategy } from './constants';
import { ApiSecurity } from '@nestjs/swagger';
// import { AuthGuard } from '@nestjs/passport';
// import { Public } from '@prisma/client/runtime/library';
// import { Public } from "./public-strategy";
// import { AuthGuard } from './auth.guard';
// import { Request } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {
    //
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  // login
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() data: LoginUserDto) {
    console.log(data);

    return await this.authService.signIn(data);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() data: CreateUserDto) {
    return await this.authService.signUp(data);
  }

  // @Get('me')
  // getMe() {
  //   return this.authService.getMe();
  // }

  // @
  @UseGuards(AuthGuard)
  // @UseGuards(AuthGuard(AuthStrategy.JWT))
  @ApiSecurity(AuthStrategy.JWT)
  @Get('profile')
  async getProfile(@Request() req) {
    const email = req.user.email;
    return await this.authService.getMeByEmail(email);
  }

  // register
  // get me
}
