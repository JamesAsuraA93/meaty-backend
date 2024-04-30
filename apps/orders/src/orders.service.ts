import { Injectable } from '@nestjs/common';
import { CreateBasketDto, CreateOrderDto } from './dto/basket.dto';
import { UpdateOrderDto } from './dto/order.dto';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {
    //
  }

  getHello(): string {
    return 'Hello World!';
  }

  // admin
  async getAllOrders() {
    const orders = await this.prisma.order.findMany({
      select: {
        id: true,
        status: true,
        Payment: {
          select: {
            method: true,
            status: true,
          },
        },
        items: {
          select: {
            product: {
              select: {
                // id: true,
                name: true,
                price: true,
                Comment: {
                  select: {
                    comment: true,
                    id: true,
                    sentimentScore: true,
                  },
                },
                ProductDetail: {
                  select: {
                    brand: true,
                    cbdMax: true,
                    cbdMin: true,
                    thcMax: true,
                    thcMin: true,
                    timeDelivery: true,
                  },
                },
                filePath: true,
              },
            },
            quantity: true,
            order: {
              select: {
                user: {
                  select: {
                    email: true,
                  },
                },
                Payment: {
                  select: {
                    method: true,
                    status: true,
                  },
                },
                deliveryFee: true,
                discount: true,
                totalPriceAmount: true,
              },
            },
          },
        },
      },
    });

    return orders;
  }

  async checkout(email: string, dto: CreateOrderDto) {
    // console.log({
    //   email,
    //   dto,
    // });
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const basket = await this.prisma.basket.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        price: true,
        quantity: true,
        // productId: true,
        product: true,
        productId: true,
        user: true,
      },
    });

    console.log({
      basket,
    });

    const selectedBasket = basket.filter((item) => {
      return dto.basketId.includes(item.id.toString());
    });

    // const selectedBasket = await this.prisma.basket.findMany({
    //   where: {
    //     userId: user.id,
    //     id: {
    //       equals: +dto.basketId,
    //     },
    //   },
    // });

    // console.log({
    //   selectedBasket,
    // });

    const order = await this.prisma.order.create({
      data: {
        // userId: user.id,
        // userId: user.id,
        deliveryFee: 15,
        discount: 0,
        status: 'PENDING',
        totalPriceAmount: selectedBasket.reduce((acc, item) => {
          return acc + item.product.price * item.quantity;
        }, 0),
        Payment: {
          create: {
            amount: selectedBasket.reduce((acc, item) => {
              return acc + item.product.price * item.quantity;
            }, 0),
            method: dto.paymentType,
            status: 'PENDING',
          },
        },
        userId: user.id,
        // user: {
        //   create: {
        //     email: user.email,
        //     Address: {
        //       create: {
        //         addressLine1: dto.address,
        //         country: 'Thailand',
        //         district: dto.district,
        //         email: dto.emailInfo,
        //         firstname: dto.firstname,
        //         lastname: dto.lastname,
        //         phone: dto.phone,
        //         postalCode: dto.postalCode,
        //         province: dto.province,
        //         subDistrict: dto.district,
        //       },
        //     },
        //   },
        // },
        items: {
          createMany: {
            data: selectedBasket.map((item) => {
              return {
                quantity: item.quantity,
                // product: {
                //   connect: {
                //     id: item.productId,
                //   },
                // },
                subtotal: item.product.price * item.quantity,
                productId: item.productId,
              };
            }),
          },
        },
      },
    });

    console.log({
      selectedBasket,
    });

    console.log({
      order,
    });

    console.log(
      selectedBasket.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
      }, 0),
    );

    // re-cost credit user
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        credit: {
          decrement:
            15 +
            selectedBasket.reduce((acc, item) => {
              return acc + item.product.price * item.quantity;
            }, 0),
        },
      },
    });

    await this.prisma.basket.deleteMany({
      where: {
        userId: user.id,
      },
    });

    return {
      status: 'success',
      order,
    };
  }

  async getSelfOrders(email: string) {
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

  async getOrderById(id: number) {
    const order = await this.prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        items: true,
        Payment: true,
        user: true,
      },
    });
    return order;
  }

  async updateOrderStatus(id: number, dto: UpdateOrderDto) {
    const order = await this.prisma.order.update({
      where: {
        id,
      },
      data: {
        status: dto.status,
      },
    });
    return order;
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

  async addToBasket(dto: CreateBasketDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
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

    const totalPrice: number = basketItems
      .filter((item) => item.id === +dto.basketId)
      .reduce((acc, curr) => {
        return acc + curr.price * curr.quantity;
      }, 0);

    const order = await this.prisma.order.create({
      data: {
        userId: user.id,
        deliveryFee: 15,
        discount: 0,
        status: 'PENDING',
        totalPriceAmount: totalPrice,
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
              subtotal: item.price * item.quantity,
            };
          }),
        },
      },
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
  //         deliveryFee: 15,
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
