import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthStrategy } from './constants';
import {
  CreateUserDto,
  LoginUserDto,
  UpdateUserCreditDto,
} from './dto/users.dto';
import { Public } from './public-strategy';
// import { AuthGuard } from '@nestjs/passport';
// import { Public } from '@prisma/client/runtime/library';
// import { Public } from "./public-strategy";
// import { AuthGuard } from './auth.guard';
// import { Request } from 'express';

@Controller('')
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
  async getProfile(@Req() req) {
    const email = req.user.email;
    return await this.authService.getMeByEmail(email);
  }

  // register
  // get me
  @ApiTags('Admin')
  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('allUser')
  async getAllUser() {
    return await this.authService.getAllUser();
  }

  @ApiTags('Admin')
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('createUser')
  async createUser(@Body() data: CreateUserDto) {
    return await this.authService.signUp(data);
  }

  @ApiTags('Admin')
  @Public()
  @HttpCode(HttpStatus.OK)
  @Put('updateUserCredit/:id')
  async updateUser(@Param('id') id: string, @Body() data: UpdateUserCreditDto) {
    return await this.authService.updateCreditUser(+id, data);
  }
}
