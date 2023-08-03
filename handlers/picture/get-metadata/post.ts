import axios from "axios";
// import FormData from "form-data";
import fs from "fs";

async function uploadImage(filePath: string) {
    // const form = new FormData();
    const base64Image = fs.readFileSync(filePath, { encoding: "base64" });
    // form.append("imageFile", fs.createReadStream(filePath));

    // form-data에 필요한 헤더 정보를 가져옵니다.
    // const formHeaders = form.getHeaders();
    try {
        const response = await axios.post("http://localhost:4000/picture", base64Image);
        console.log("Image uploaded successfully:", response.data);
    } catch (error) {
        console.error("Error uploading image:", error);
    }
}
const imagePath = "src/image/능소화.jpeg"; // 여기에 이미지 경로를 지정해주세요
uploadImage(imagePath);
