import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateBasketDto, CreateOrderDto } from './dto/basket.dto';

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

  async getOrders(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    const orders = await this.prisma.order.findMany({
      where: {
        userId: user.id,
      },
      include: {
        items: true,
        Payment: true,
        user: true,
      },
    });
    return orders;
  }

  async createOrder(email: string, dto: CreateOrderDto) {
    console.log(email, dto);
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const basketItems = await this.prisma.basket.findMany({
      where: {
        userId: user.id,
      },
      include: {
        product: true,
      },
    });

    // console.log(basketItems.);
    // const sumBasketItems = basketItems.reduce((acc, item) => {
    //   return {
    //     x: (acc.price * acc.quantity) + (item.product.price * item.quantity)
    //   }
    // })

    // console.log(sumBasketItems)

    const order = await this.prisma.order.create({
      data: {
        userId: user.id,
        deliveryFee: 30,
        discount: 0,
        status: 'PENDING',
        totalPriceAmount: 0,
        items: {
          create: basketItems.map((item) => {
            return {
              quantity: item.quantity,
              product: {
                connect: {
                  id: item.productId,
                },
              },
              productId: item.productId,
              subtotal: 0,
            };
          }),
        },
        // create: {
        //   quantity: dto.quantity,
        //   product: {
        //     connect: {
        //       id: +dto.productId,
        //     },
        //   },
        // }
        // create: [
        //   {
        //     quantity: dto.quantity,
        //     product: {
        //       connect: {
        //         id: +dto.productId,
        //       },
        //     },
        //   },
        // ],
      },
      // },
      // );
    });

    return order;
  }

  // async checkout(email: string) {
  //   const user = await this.prisma.user.findUnique({
  //     where: {
  //       email: email,
  //     },
  //   });

  //   const basket = await this.prisma.basket.findMany({
  //     where: {
  //       userId: user.id,
  //     },
  //   });

  //     const order = await this.prisma.order.create({
  //       data: {
  //         userId: user.id,
  //         deliveryFee: 0,
  //         discount: 0,
  //         status: "PENDING",
  //         totalPriceAmount: basket.reduce((acc, item) => {
  //           return acc + item.
  //         }, 0),
  //       },
  //     },
  //     });

  //     await this.prisma.basket.deleteMany({
  //       where: {
  //         userId: user.id,
  //       },
  //     });

  // return order;
  // }
}
