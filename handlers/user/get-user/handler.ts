import "reflect-metadata";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { User } from "../../../src/user/user";
import { AppDataSource } from "../../../src/common/datasource";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    await AppDataSource.initialize();
    const { userId } = event.pathParameters || {};
    if (!userId) throw new Error("아이디를 입력해주세요");

    const user = await AppDataSource.getRepository(User).findOne({ where: { id: Number(userId) } });
    const userInput = user ? user : "유저 없음";
    try {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: userInput,
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
