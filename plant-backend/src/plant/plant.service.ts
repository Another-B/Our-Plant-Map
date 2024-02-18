import * as exifParser from 'exif-parser';
import { Injectable } from '@nestjs/common';
import { UploadImageRequestDto, UploadImageResponseDto } from 'src/dto/plant';

@Injectable()
export class PlantService {
  private parseimageMetadata(metadata: any): object {
    // 객체 초기화 없이 빈 객체 생성
    const imageMetadata: { [key: string]: any } = {};
    if (metadata.GPSLatitudeRef) imageMetadata.latitudeRef = metadata.GPSLatitudeRef;
    if (metadata.GPSLatitude) imageMetadata.latitude = metadata.GPSLatitude;
    if (metadata.GPSLongitudeRef) imageMetadata.longitudeRef = metadata.GPSLongitudeRef;
    if (metadata.GPSLongitude) imageMetadata.longitude = metadata.GPSLongitude;
    if (metadata.Orientation) imageMetadata.orientation = metadata.Orientation;
    if (metadata.Software) imageMetadata.software = metadata.Software;
    if (metadata.ImageWidth) imageMetadata.imageWidth = metadata.ImageWidth;
    if (metadata.ImageHeight) imageMetadata.imageHeight = metadata.ImageHeight;
    if (metadata.Make) imageMetadata.make = metadata.Make;
    if (metadata.Model) imageMetadata.model = metadata.Model;
    if (metadata.DateTimeOriginal) {
      imageMetadata.dateTimeOriginal = new Date(metadata.DateTimeOriginal * 1000).toISOString();
    }
    if (metadata.CreateDate) {
      imageMetadata.createDate = new Date(metadata.CreateDate * 1000).toISOString();
    }
    if (metadata.ModifyDate) {
      imageMetadata.modifyDate = new Date(metadata.ModifyDate * 1000).toISOString();
    }

    return imageMetadata;
  }

  private getFileSize(data: Buffer): number {
    return data.length / 1024 / 1024;
  }

  private extractimageMetadata(data: Buffer): object {
    const parser = exifParser.create(data);
    const result = parser.parse();
    if (result && result.tags) {
      const metadata = this.parseimageMetadata(result.tags);
      return metadata;
    }
    return {};
  }

  private saveMetadata(metadata: object): Promise<void> {
    // TO-DO: save metadata to database
    console.log('saveMetadata', metadata);
    return;
  }

  public async uploadImage(image: UploadImageRequestDto): Promise<UploadImageResponseDto> {
    const data = Buffer.from(image.base64Image, 'base64');
    const fileSize = this.getFileSize(data);
    if (fileSize > 10) {
      // TO-DO: resize image
      console.log('resize image, file size:', fileSize);
    }
    const metadata = this.extractimageMetadata(data);

    await this.saveMetadata(metadata);
    return {
      metadata: metadata,
    };
  }
}
