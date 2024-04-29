import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBasketDto {
  // @IsString()
  // @IsNotEmpty()
  // @ApiProperty({
  //   description: 'The email of the product',
  //   name: 'email',
  // })
  // email: string;

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
}
