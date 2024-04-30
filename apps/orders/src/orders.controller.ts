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
import { CreateBasketDto, CreateOrderDto } from './dto/basket.dto';
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

  @Get('basket/:email')
  async getBasketByEmail(@Param('email') email: string) {
    return await this.ordersService.getBasket(email);
  }

  // add to basket
  @Post('basket')
  async addToBasket(@Body() dto: CreateBasketDto) {
    // console.log('user', req.authorization);
    // const email = req.user.email;
    // console.log('email', email);
    return await this.ordersService.addToBasket(dto);
  }

  // edit basket item
  // @Post('basket/:id')
  // async editBasket(@Req() req, @Body() dto: CreateBasketDto) {
  //   const email = req.user.email;
  //   return await this.ordersService.addToBasket(email, dto);
  // }

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

  @ApiTags('User')
  @Post('checkout/:email')
  async checkout(@Param() email: string, @Body() dto: CreateOrderDto) {
    // const email = req.user.email;
    // const {
    //   basketId,
    //   firstname,
    //   lastname,
    //   phone,
    //   emailInfo,
    //   address,
    //   district,
    //   paymentType,
    //   postalCode,
    //   province,
    // } = dto;
    return await this.ordersService.checkout(email, dto);
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
