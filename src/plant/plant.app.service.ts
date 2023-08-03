import * as exifParser from "exif-parser";

export function parseMetaData(metadata: any): object {
    const selectedFields = {
        GPSLatitudeRef: metadata.GPSLatitudeRef,
        GPSLatitude: metadata.GPSLatitude,
        GPSLongitudeRef: metadata.GPSLongitudeRef,
        GPSLongitude: metadata.GPSLongitude,
        DateTimeOriginal: new Date(metadata.DateTimeOriginal * 1000).toISOString(),
        CreateDate: new Date(metadata.CreateDate * 1000).toISOString(),
        ModifyDate: new Date(metadata.ModifyDate * 1000).toISOString(),
        Software: metadata.Software,
        ImageWidth: metadata.ImageWidth,
        ImageHeight: metadata.ImageHeight,
        Make: metadata.Make,
        Model: metadata.Model,
    };
    return selectedFields;
}

export function getFileSize(data: Buffer): number {
    // return file size in Mbytes
    // TO-DO: if File Size 10Mbytes over, resize image
    return data.length / 1024 / 1024;
}

export function extractMetadata(data: Buffer): object {
    const parser = exifParser.create(data);
    const result = parser.parse();
    if (result && result.tags) {
        const metadata = parseMetaData(result.tags);
        return metadata;
    }
    return {};
}

export function saveMetadata(metadata: object): void {
    console.log("saveMetadata", metadata);
    return;
    // TO-DO: save metadata to database
}

export interface RequestBody {
    base64Image: string;
}
