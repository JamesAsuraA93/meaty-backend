import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { PrismaModule } from './prisma/prisma.module';
import { FilesModule } from './files/files.module';
// import { MulterModule } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { diskStorage } from 'multer';
// import fs from 'fs-extra';

@Module({
  imports: [
    PrismaModule,
    FilesModule,
    // MulterModule.registerAsync({
    //   useFactory: async () => {
    //     return {
    //       storage: diskStorage({
    //         destination: async (_req, _file, cb) => {
    //           let path: string = String(process.env.APP_STORAGE_PATH);
    //           if (_req.body.basket) {
    //             path = `${path}/${_req.body.basket}`;
    //           }
    //           await fs.ensureDirSync(path);
    //           return cb(null, path);
    //         },
    //         filename: (_req, _file, cb) => {
    //           const mime = _file.originalname.split('.').pop();
    //           return cb(null, `${Date.now()}.${mime}`);
    //         },
    //       }),
    //     };
    //     // return {
    //     //   dest: process.env.APP_STORAGE_PATH,
    //     //   // storage: diskStorage({
    //     //   //   destination: async (_req, _file, cb) => {

    //     //   //   },
    //     //   // }),
    //     // };
    //   },
    // }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {
  //
}

// @Module({
//   imports: [
//     MulterModule.registerAsync({
//       useFactory: async () => {
//         return {
//           storage: diskStorage({
//             destination: async (_req, _file, cb) => {
//               let path: string = String(process.env.APP_STORAGE_PATH);
//               if (_req.body.basket) {
//                 path = `${path}/${_req.body.basket}`;
//               }
//               // if (!fs.existsSync(path)) {
//               await fs.ensureDirSync(path);
//               // }
//               return cb(null, path);
//             },
//             filename: (_req, _file, cb) => {
//               const mime = _file.originalname.split('.').pop();
//               return cb(null, `${Date.now()}.${mime}`);
//             },
//           }),
//         };
//       },
//     }),
//   ],
//   controllers: [UploadController],
//   providers: [UploadService],
// })
// export class UploadModule {}
