import { Body, Controller, Delete, Get, Post, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateBasketDto } from './dto/basket.dto';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {
    //
  }

  @Get()
  getHello(): string {
    return this.ordersService.getHello();
  }

  // get my basket
  @Get('basket')
  async getBasket(@Req() req) {
    const email = req.user.email;
    return await this.ordersService.getBasket(email);
  }

  // add to basket
  @Post('basket')
  async addToBasket(@Req() req, @Body() dto: CreateBasketDto) {
    const email = req.user.email;
    return await this.ordersService.addToBasket(email, dto);
  }

  // edit basket item
  @Post('basket/:id')
  async editBasket(@Req() req, @Body() dto: CreateBasketDto) {
    const email = req.user.email;
    return await this.ordersService.addToBasket(email, dto);
  }

  // remove from basket
  @Delete('basket/:id')
  async removeFromBasket(@Req() req, @Body() dto: CreateBasketDto) {
    const email = req.user.email;
    return await this.ordersService.removeFromBasket(email, dto);
  }

  // checkout create order

  @Get('orders')
  async getOrders(@Req() req) {
    const email = req.user.email;
    return await this.ordersService.getOrders(email);
  }

  // @Post('checkout')
  // async checkout(@Req() req, @Body() dto: CreateBasketDto){
  //   const email = req.user.email;
  //   return await this.ordersService.checkout(email);
  // }
}
