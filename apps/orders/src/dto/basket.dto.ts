import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBasketDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The email of the product',
    name: 'email',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The productId of the product',
    name: 'productId',
  })
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The quantity of the product',
    name: 'quantity',
  })
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The price of the product',
    name: 'price',
  })
  price: number;
}

export class UpdateBasketDto extends CreateBasketDto {
  //
}

// export class PaymentDto {

// }

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The basketId of the product list',
    name: 'basketId',
  })
  basketId: string[];

  // Personal Information
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The firstname of the user',
    name: 'firstname',
  })
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The lastname of the user',
    name: 'lastname',
  })
  lastname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The phone of the user',
    name: 'phone',
  })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The email info of the user',
    name: 'emailInfo',
  })
  emailInfo: string;

  // Delivery Information
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The address of the user',
    name: 'address',
  })
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The province of the user',
    name: 'province',
  })
  province: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The district of the user',
    name: 'district',
  })
  district: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The postal code of the user',
    name: 'postalCode',
  })
  postalCode: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The paymentId of the product list',
    name: 'paymentType',
  })
  paymentType: PaymentMethod;
}
