import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
    extractMetadata,
    getFileSize,
    saveMetadata,
    RequestBody,
} from "../../../src/plant/plant.app.service";
// import fs from "fs";
// import { get } from "http";
// const url = "https://aws.amazon.com/";

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // console.log("#####################!!!!!!!!!!!!!!");
    // const body: RequestBody = JSON.parse(event.body || "{}");
    // console.log("body", event.body);
    // if (!body.base64Image) return { statusCode: 400, body: "base64Image is required" };
    // console.log("body", body);
    const base64Image = event.body;
    // const imageData = fs.readFileSync(body.imageFile);
    const buffer = Buffer.from(base64Image, "base64");
    const metadata = extractMetadata(buffer);
    const fileSize = getFileSize(buffer); // TO_DO: resize image if file size is over 10Mbytes
    const result = { metadata, fileSize };
    saveMetadata(metadata);
    try {
        return {
            statusCode: 200,
            body: JSON.stringify({
                body: JSON.stringify({
                    data: result,
                    // data: 1,
                }),
            }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "some error happened",
            }),
        };
    }
};
