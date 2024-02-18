import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { PlantController } from './plant.controller';
import { imageUploadMiddleware } from './plant.middleware';
import { PlantService } from './plant.service';

@Module({
  imports: [],
  controllers: [PlantController],
  providers: [PlantService],
})
export class PlantModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(imageUploadMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
