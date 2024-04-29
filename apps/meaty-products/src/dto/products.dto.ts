import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

// import { PartialType } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({
    description: 'The name of the product',
    minLength: 5,
    name: 'name',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @ApiProperty({
    description: 'The description of the product',
    minLength: 10,
    name: 'description',
  })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The price of the product',
    name: 'price',
  })
  price: number;

  @IsNumber()
  @ApiProperty({
    description: 'The quantity of the product',
    name: 'quantity',
  })
  quantity: number;

  // brand
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({
    description: 'The brand of the product',
    minLength: 5,
    name: 'brand',
  })
  brand: string;

  @IsNumber()
  @ApiProperty({
    description: 'The maximum CBD of the product',
    name: 'cbdMax',
    default: 0,
  })
  cbdMax: number;

  @IsNumber()
  @ApiProperty({
    description: 'The minimum CBD of the product',
    name: 'cbdMin',
    default: 0,
  })
  cbdMin: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The country where the product is produced',
    name: 'producedIn',
    default: 'USA',
  })
  producedIn: string;

  @IsNumber()
  @ApiProperty({
    description: 'The maximum THC of the product',
    name: 'thcMax',
    default: 0,
  })
  thcMax: number;

  @IsNumber()
  @ApiProperty({
    description: 'The minimum THC of the product',
    name: 'thcMin',
    default: 0,
  })
  thcMin: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The time delivery of the product',
    name: 'timeDelivery',
    default: '1-2 days',
  })
  timeDelivery: string;

  // @IsNumber()
  // @ApiProperty({
  //   description: 'The file id of the product',
  //   name: 'fileId',
  // })
  // fileId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The image of the product',
    name: 'filePath',
  })
  filePath: string;
}

export class UpdateProductDto extends CreateProductDto {
  // @ApiProperty({
  //   description: 'The id of the product',
  //   name: 'id',
  // })
  // id: number;
}

// data: {
//   price: createProductDto.price, ✅
//   Stock: {
//     create: {
//       quantity: createProductDto.stock, ✅
//     },
//   },
//   name: createProductDto.name, ✅
//   ProductDetail: {
//     create: {
//       brand: createProductDto.description,
//       cbdMax: 0,
//       cbdMin: 0,
//       producedIn: 'USA',
//       thcMax: 0,
//       thcMin: 0,
//       timeDelivery: '1-2 days',
//     },
//   },
//   description: createProductDto.description,
//   image: {
//     create: {
//       ...fileData,
//     },
//   },
// },

// export type CreateProductDto = {
//   name: string;
//   description: string;
//   price: number;
//   stock: number;
// };
