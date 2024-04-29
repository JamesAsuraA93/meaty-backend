import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateOrderDto {
  @IsEnum(OrderStatus)
  @IsNotEmpty()
  @ApiProperty({
    description: 'The productId of the product',
    name: 'status',
    default: OrderStatus.PENDING,
    example: `${OrderStatus.PENDING} | ${OrderStatus.CANCELED} | ${OrderStatus.DELIVERED} | ${OrderStatus.SHIPPING}`,
  })
  status: OrderStatus;
}

// OrderStatus
