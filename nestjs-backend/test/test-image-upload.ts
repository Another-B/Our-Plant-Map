import fetch from 'node-fetch';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

// 이미지 파일을 base64로 인코딩하는 함수
function encodeImageToBase64(filePath: string): string {
  return readFileSync(filePath, 'base64');
}

// base64 인코딩된 이미지를 NestJS 서버에 POST 요청으로 보내는 함수
async function uploadImageToServer(
  imageBase64: string,
  url: string,
): Promise<void> {
  const requestBody = {
    base64Image: `${imageBase64}`,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log('Server Response:', responseData);
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}

// 이미지 파일 경로와 서버 URL 설정
const imagesDirPath = './test_image'; // 이미지 파일이 위치한 디렉토리 경로
const serverUrl = 'http://localhost:3000/plant/image/upload'; // NestJS 서버 엔드포인트 URL

// 디렉토리 내의 모든 파일을 읽고 이미지 업로드 실행
const files = readdirSync(imagesDirPath);
files.forEach((file) => {
  const fullPath = join(imagesDirPath, file);
  // 파일 확장자를 통해 이미지 파일인지 확인 (예시: .jpg, .jpeg, .png 등)
  if (/\.(jpg|jpeg|png)$/i.test(file)) {
    console.log(`Uploading ${file}...`);
    const imageBase64 = encodeImageToBase64(fullPath);
    uploadImageToServer(imageBase64, serverUrl)
      .then(() => {
        console.log(`${file} uploaded successfully.`);
      })
      .catch((error) => {
        console.error(`Error uploading ${file}:`, error);
      });
  }
});
