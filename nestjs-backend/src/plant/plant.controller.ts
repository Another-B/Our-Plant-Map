import { Controller, Post, Body } from '@nestjs/common';
import { PlantService } from './plant.service';
import { UploadImageRequestDto, UploadImageResponseDto } from 'src/dto/plant';

@Controller('plant')
export class PlantController {
  constructor(private readonly plantService: PlantService) {}

  @Post('image/upload')
  uploadImage(
    @Body() uploadImageRequestDto: UploadImageRequestDto,
  ): Promise<UploadImageResponseDto> {
    return this.plantService.uploadImage(uploadImageRequestDto);
  }
}
