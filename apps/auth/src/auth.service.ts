import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  CreateUserDto,
  LoginUserDto,
  UpdateUserCreditDto,
} from './dto/users.dto';
import { PrismaService } from './prisma/prisma.service';

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

  async getAllUser() {
    try {
      return await this.prisma.user.findMany({
        select: {
          id: true,
          email: true,
          role: true,
          credit: true,
          birthdate: true,
          Address: true,
          Basket: true,
          filePath: true,
          Order: true,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async getUserById(id: number) {
    try {
      return await this.prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          Address: true,
          Basket: true,
          File: true,
          Order: true,
          SysLog: true,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async updateCreditUser(id: number, data: UpdateUserCreditDto) {
    const credit: number = +data.credit;

    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        credit: credit,
      },
    });
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
  async signIn(dto: LoginUserDto) {
    console.log(dto);
    // console.log({
    //   email: data.email,
    //   password: data.password,
    // });
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
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

    if (user?.password !== dto.password) {
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
        Basket: true,
        credit: true,
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
