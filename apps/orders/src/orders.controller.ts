import { Body, Controller, Get, Post, Req } from '@nestjs/common';
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

  // remove from basket
  @Post('basket/:id')
  async removeFromBasket(@Req() req, @Body() dto: CreateBasketDto) {
    const email = req.user.email;
    return await this.ordersService.removeFromBasket(email, dto);
  }

  // checkout

  // edit basket item
}
