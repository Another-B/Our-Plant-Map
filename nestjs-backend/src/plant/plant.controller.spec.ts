import { readFileSync } from 'fs';
import { Test, TestingModule } from '@nestjs/testing';
import { PlantController } from './plant.controller';
import { PlantService } from './plant.service';
import { UploadImageRequestDto, UploadImageResponseDto } from 'src/dto/plant';

describe('PlantController', () => {
  let controller: PlantController;
  let mockPlantService: Partial<PlantService>;

  beforeEach(async () => {
    // PlantService의 mock 구현
    mockPlantService = {
      uploadImage: jest.fn((dto: UploadImageRequestDto) => {
        return Promise.resolve({
          metadata: {
            latitudeRef: 'N',
            latitude: 37.285619499999996,
            longitudeRef: 'E',
            longitude: 127.0179502,
            orientation: 1,
            software: 'G973NKSU7HVE1',
            imageWidth: 4032,
            imageHeight: 2268,
            make: 'samsung',
            model: 'SM-G973N',
            dateTimeOriginal: '2022-08-07T21:13:03.000Z',
            createDate: '2022-08-07T21:13:03.000Z',
            modifyDate: '2022-08-07T21:13:03.000Z',
          },
        }); // 예시 응답, 실제 구현에 맞게 조정 필요
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlantController],
      providers: [
        {
          provide: PlantService,
          useValue: mockPlantService,
        },
      ],
    }).compile();

    controller = module.get<PlantController>(PlantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('uploadImage', () => {
    it('should call uploadImage method with expected payload', async () => {
      const base64Image = readFileSync('./test/test_image/능소화.jpeg', 'base64');
      const requestDto: UploadImageRequestDto = {
        base64Image: base64Image, // 예시 데이터, 실제 구현에 맞게 조정 필요
      };
      const expectedResult: UploadImageResponseDto = {
        metadata: {
          latitudeRef: 'N',
          latitude: 37.285619499999996,
          longitudeRef: 'E',
          longitude: 127.0179502,
          orientation: 1,
          software: 'G973NKSU7HVE1',
          imageWidth: 4032,
          imageHeight: 2268,
          make: 'samsung',
          model: 'SM-G973N',
          dateTimeOriginal: '2022-08-07T21:13:03.000Z',
          createDate: '2022-08-07T21:13:03.000Z',
          modifyDate: '2022-08-07T21:13:03.000Z',
        }, // 예시 응답, 실제 구현에 맞게 조정 필요
      };

      const result = await controller.uploadImage(requestDto);

      expect(result).toEqual(expectedResult);
      expect(mockPlantService.uploadImage).toHaveBeenCalledWith(requestDto);
    });
  });
});
