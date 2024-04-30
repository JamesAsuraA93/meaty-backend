import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({
    description: 'The comment',
    minLength: 5,
    name: 'comment',
  })
  comment: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The product id',
    name: 'productId',
  })
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The sentimentScore',
    name: 'sentimentScore',
  })
  sentimentScore: number;
}
