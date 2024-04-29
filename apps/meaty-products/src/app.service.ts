import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/products.dto';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {
    //
  }

  async getProducts() {
    return await this.prisma.product.findMany({
      include: {
        Stock: true,
        ProductDetail: true,
        Comment: true,
      },
    });
  }

  async getProduct(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: +id,
      },
      // include: {
      //   Image: true,
      // },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    const stock = await this.prisma.stock.findUnique({
      where: {
        id: product.id,
        // id: product.id,
        // productId: +product.id,
      },
    });

    if (!stock) {
      throw new Error('Stock not found');
    }

    // const image = await this.prisma.image.findUnique({
    //   where: {
    //     id: product.id,
    //   },
    // });

    // if (!image) {
    //   throw new Error('Image not found');
    // }

    const productDetail = await this.prisma.productDetail.findUnique({
      where: {
        id: product.id,
      },
    });

    if (!productDetail) {
      throw new Error('Product Detail not found');
    }

    return {
      ...product,
      stock,
      productDetail,
    };

    // console.log('id', id);
    return await this.prisma.product.findUnique({
      where: {
        id: +id,
      },
      // include: {
      //   Stock: true,
      //   image: true,
      //   ProductDetail: true,
      // },
    });
    // }
    // });
  }

  async createProduct(createProductDto: CreateProductDto) {
    // , file_id: number
    // console.log('createProductDto', createProductDto);
    // console.log('file_id', file_id);
    // if (!file_id || file_id === 0) {
    //   throw new Error('File upload not implemented');
    // }

    // const fileData = await this.prisma.file.findUnique({
    //   where: {
    //     id: file_id,
    //   },
    // });

    // if (!fileData) {
    //   throw new Error('File not found');
    // }

    return await this.prisma.product.create({
      data: {
        price: createProductDto.price,
        Stock: {
          create: {
            quantity: createProductDto.quantity,
          },
        },
        name: createProductDto.name,
        ProductDetail: {
          create: {
            brand: createProductDto.brand,
            cbdMax: createProductDto.cbdMin,
            cbdMin: createProductDto.cbdMin,
            producedIn: createProductDto.producedIn,
            thcMax: createProductDto.thcMax,
            thcMin: createProductDto.thcMin,
            timeDelivery: createProductDto.timeDelivery,
          },
        },
        description: createProductDto.description,
        filePath: createProductDto.filePath,
        // Image: {
        //   create: {
        //     encoding: fileData.encoding,
        //     filename: fileData.filename,
        //     mimetype: fileData.mimetype,
        //     path: fileData.path,
        //     size: fileData.size,
        //   },
        // },
      },
    });
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
    // file_id: number,
  ) {
    // if (!file_id || file_id === 0) {
    //   throw new Error('File upload not implemented');
    // }

    // const fileData = await this.prisma.file.findUnique({
    //   where: {
    //     id: file_id,
    //   },
    // });

    // if (!fileData) {
    //   throw new Error('File not found');
    // }

    return await this.prisma.product.update({
      where: { id },
      data: {
        name: updateProductDto.name,
        price: updateProductDto.price,
        description: updateProductDto.description,
        // fileId: fileData.id,
        filePath: updateProductDto.filePath,
        // image: {
        //   update: {
        //     where: {
        //       id: id,
        //     },

        //   }
        // },
        Stock: {
          update: {
            // quantity: updateProductDto.quantity
            where: {
              id: id,
            },
            data: {
              quantity: updateProductDto.quantity,
            },
          },
        },
        ProductDetail: {
          update: {
            where: {
              id: id,
            },
            data: {
              brand: updateProductDto.brand,
              cbdMax: updateProductDto.cbdMin,
              cbdMin: updateProductDto.cbdMin,
              producedIn: updateProductDto.producedIn,
              thcMax: updateProductDto.thcMax,
              thcMin: updateProductDto.thcMin,
              timeDelivery: updateProductDto.timeDelivery,
            },
          },
          // }
          // cbdMax: updateProductDto.cbdMin,
          // cbdMin: updateProductDto.cbdMin,
          // producedIn: updateProductDto.producedIn,
          // thcMax: updateProductDto.thcMax,
          // thcMin: updateProductDto.thcMin,
          // timeDelivery: updateProductDto.timeDelivery,
        },
      },
      // description: updateProductDto.description || '',
      // image: {
      //   update: {
      //     encoding: file_id,
      //     filename: file_id,
      //     mimetype: file_id,
      //     path: file_id,
      //     size: file_id,
      //   },
      // },
    });
    // });
  }
  async deleteProduct(id: number) {
    return await this.prisma.product.delete({
      where: { id },
    });
  }

  getHello(): string {
    return 'Hello World! Hi this is meaty-products API. with 3000';
  }

  // @Get()
  // findAll() {
  //   return this.findAll();
  // }

  // App Product Service

  // getProducts(): string {
  //   return 'Products';
  // }
}

// async onModuleInit() {
//   await this.$connect();
// }

// async onModuleDestroy() {
//   await this.$disconnect();
// }

// // App Product Service

// async products() {
//   return this.product.findMany();
// }

// async product(id: number) {
//   return this.product.findUnique({
//     where: { id },
//   });
// }

// async createProduct(data: any) {
//   return this.product.create({ data });
// }

// async updateProduct(id: number, data: any) {
//   return this.product.update({
//     where: { id },
//     data,
//   });
// }

// async deleteProduct(id: number) {
//   return this.product.delete({
//     where: { id },
//   });
// }

// async deleteAllProducts() {
//   return this.product.deleteMany();
// }

// async productImage(id: number) {
//   return this.productImage.findUnique({
//     where: { id },
//   });
// }

// async createProductImage(data: any) {
//   return this.productImage.create({ data });
// }

// async updateProductImage(id: number, data: any) {
//   return this.productImage.update({
//     where: { id },
//     data,
//   });
// }

// async deleteProductImage(id: number) {
//   return this.productImage.delete({
//     where: { id },
//   });
// }

// async deleteAllProductImages() {
//   return this.productImage.deleteMany();
// }
