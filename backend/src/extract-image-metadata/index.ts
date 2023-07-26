import * as exifParser from 'exif-parser';
import * as fs from 'fs';
import { Handler } from 'aws-lambda';


function parseMetaData(metadata): object {
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
      Model: metadata.Model
  };
  return selectedFields;
}

function getFileSize(data): number {
  // return file size in Mbytes
  // TO-DO: if File Size 10Mbytes over, resize image
  return data.length / 1024 / 1024;
}

function extractMetadata(data): object {
  const parser = exifParser.create(data);
  const result = parser.parse();
  if (result && result.tags) {
    const metadata = parseMetaData(result.tags);
    return metadata;
  }
}

function saveMetadata(metadata): void {
  // TO-DO: save metadata to database
}

interface ExtractRequest {
  filePath: string;
}

export const handler: Handler = async (event, context) => {
  console.log("event", event)
  const body: ExtractRequest = JSON.parse(event.body || '{}')
  if (!body.filePath) return { statusCode: 400, body: 'filePath is required' }
  const imageData = fs.readFileSync(body.filePath);
  const metadata = extractMetadata(imageData);
  const fileSize = getFileSize(imageData);  // TO_DO: resize image if file size is over 10Mbytes
  const result = {
    metadata,
    fileSize
  };
  saveMetadata(metadata);

  console.log(result)
  return result;
};

// start with `ts-node index.ts` to test locally
if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
  (async function () {    
    const res = await handler(({
      pathParameters: { resourceName: process.argv[2] || '' },
      requestContext: {},
      body: JSON.stringify({
          'filePath': 'src/능소화.jpeg'
      }),
    }))
    if (!res || typeof res === 'string' || !res.body) return
    console.log(res.statusCode, JSON.parse(res.body))
  })()
}

