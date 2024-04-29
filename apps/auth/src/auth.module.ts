import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { PrismaModule } from './prisma/prisma.module';
// import { PassportModule } from '@nestjs/passport';

// import { PassportModule } from '@nestjs/passport';

// UsersModule,
//     JwtModule.register({
//       global: true,
//       secret: jwtConstants.secret,
//       signOptions: { expiresIn: '1d' },
//     }),
//     TypeOrmModule.forFeature([UserEntity]),

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    // TypeOrmModule.forFeature([UserEntity]),/
    // PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
    // JwtService,
  ],
})
export class AuthModule {
  //
}

// imports: [
//   UsersModule,
//   JwtModule.register({
//     global: true,
//     secret: jwtConstants.secret,
//     signOptions: { expiresIn: '60s' },
//   }),
// ],
