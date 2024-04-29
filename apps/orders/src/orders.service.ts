import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateBasketDto } from './dto/basket.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {
    //
  }

  getHello(): string {
    return 'Hello World!';
  }

  async getBasket(email: string) {
    console.log(email);
    const items = await this.prisma.basket.findMany({
      where: {
        user: {
          email: email,
        },
      },
      include: {
        product: true,
      },
    });
    return items;
  }

  async addToBasket(email: string, dto: CreateBasketDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // console.log(email);
    const item = await this.prisma.basket.create({
      data: {
        quantity: dto.quantity,
        productId: +dto.productId,
        userId: user.id,
      },
    });
    return item;
  }

  async removeFromBasket(email: string, dto: CreateBasketDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const item = await this.prisma.basket.delete({
      where: {
        userId: user.id,
        id: +dto.productId,
      },
    });
    return item;
  }
}
