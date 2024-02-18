import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(''); // 이미지 미리보기 URL
  const [metadata, setMetadata] = useState(null); // 메타데이터 상태

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    // 파일을 읽어서 미리보기 URL 생성
    setPreviewUrl(URL.createObjectURL(event.target.files[0]));
  };

  const handleUpload = async () => {
    if (!file) {
      alert('파일을 선택해주세요.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Data = reader.result.split(',')[1];

      const requestBody = {
        base64Image: base64Data,
      };

      try {
        const response = await axios.post('http://localhost:3000/plant/image/upload', requestBody, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        // 메타데이터 상태 업데이트
        setMetadata(response.data);
        alert('파일 업로드 성공');
      } catch (error) {
        alert('파일 업로드 실패: ' + error.message);
      }
    };
    reader.onerror = (error) => {
      alert('파일 읽기 실패: ' + error);
    };
  };

  // 메타데이터를 예쁘게 포매팅하는 함수
  const formatMetadata = (metadata) => {
    return metadata ? (
      <div>
        <h3>메타데이터:</h3>
        <pre>{JSON.stringify(metadata, null, 2)}</pre>
      </div>
    ) : null;
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>업로드</button>
      {previewUrl && <img src={previewUrl} alt="Preview" style={{ width: '100%', maxWidth: '400px', marginTop: '20px' }} />}
      {metadata && formatMetadata(metadata)}
    </div>
  );
}

export default FileUpload;