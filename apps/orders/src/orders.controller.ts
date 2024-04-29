import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateBasketDto } from './dto/basket.dto';
import { UpdateOrderDto } from './dto/order.dto';
import { OrdersService } from './orders.service';

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
  @ApiTags('User')
  @Get('orders')
  async getOrders(@Req() req) {
    const email = req.user.email;
    return await this.ordersService.getOrders(email);
  }

  @ApiTags('Admin')
  @Get('orders')
  async getAllOrders() {
    return await this.ordersService.getAllOrders();
  }

  @ApiTags('Admin')
  @Get('orders/:id')
  async getOrder(@Param('id') id: string) {
    // const email = req.user.email;
    return await this.ordersService.getOrderById(+id);
  }

  @ApiTags('Admin')
  @Put('orders/:id/status')
  async updateOrderStatus(
    @Param('id') id: string,
    @Body() dto: UpdateOrderDto,
  ) {
    // const email = req.user.email;
    return await this.ordersService.updateOrderStatus(+id, dto);
  }

  // @Post('checkout')
  // async checkout(@Req() req, @Body() dto: CreateBasketDto){
  //   const email = req.user.email;
  //   return await this.ordersService.checkout(email);
  // }
}
