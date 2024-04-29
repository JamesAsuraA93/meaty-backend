import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto } from './dto/users.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {
    //
  }

  getHello(): string {
    return 'Hello World!';
  }

  // register create
  async signUp(data: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        role: 'USER',
        birthdate: data.birthdate,
      },
    });
  }

  // // login
  // async login(data: any) {
  //   return await this.prisma.user.findFirst({
  //     where: {
  //       email: data.email,
  //     },
  //   });
  // }

  // email: string,
  // password: string,
  async signIn(data: LoginUserDto) {
    // console.log('data', data);
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    // console.log({
    //   user,
    // });

    // console.log('user', user);

    // console.log({
    //   'user?.password': user?.password,
    //   'data.password': data.password,
    // });

    if (user?.password !== data.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    // console.log({
    //   payload,
    // });

    return {
      access_token: await this.jwtService.signAsync(payload),
      user,
      // data: {

      // },
    };
  }

  async getMeByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
      // include: {
      //   Address: true,
      //   File: true,
      //   Order: true,
      //   SysLog: true,
      // },
      select: {
        password: false,
        Address: true,
        File: true,
        Order: true,
        SysLog: true,
        birthdate: true,
        email: true,
        filePath: true,
        id: true,
        role: true,
      },

      // select: {
      //   password: false,
      // },
    });
  }

  // get me
  // async getMe(@Res() res: Response, @Req() req: Request) {
  //   const id = req.user.id;

  //   return await this.prisma.user.findUnique({
  //     where: {
  //       id,
  //     },
  //   });
  // }
}
