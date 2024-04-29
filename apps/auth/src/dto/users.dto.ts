import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({
    description: 'The email of the product',
    minLength: 5,
    name: 'email',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({
    description: 'The password of the product',
    minLength: 5,
    name: 'password',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({
    description: 'The confirmPassword of the product',
    minLength: 5,
    name: 'confirmPassword',
  })
  confirmPassword: string;

  // birthdate
  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The birthdate of the product',
    name: 'birthdate',
  })
  birthdate: Date;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({
    description: 'The email of the product',
    minLength: 5,
    name: 'email',
  })
  email: string;
}

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({
    description: 'The email of the product',
    minLength: 5,
    name: 'email',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({
    description: 'The password of the product',
    minLength: 5,
    name: 'password',
  })
  password: string;
}
