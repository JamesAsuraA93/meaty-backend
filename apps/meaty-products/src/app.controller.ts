import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  // UploadedFile,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateProductDto, UpdateProductDto } from './dto/products.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('product')
@ApiTags('Products')
export class AppController {
  constructor(private readonly appService: AppService) {
    //
  }

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  async getProducts() {
    try {
      return await this.appService.getProducts();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return await this.appService.getProduct(+id);
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      const file_id: number = +createProductDto.fileId;
      return await this.appService.createProduct(createProductDto, file_id);
    } catch (error) {
      // console.error(error);
      return {
        status: 'error',
        error: error.message,
      };
    }
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const file_id: number = +updateProductDto.fileId;
    return await this.appService.updateProduct(+id, updateProductDto, file_id);
  }
}
