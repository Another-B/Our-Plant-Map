import "reflect-metadata";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { User } from "../../../src/user/user";
import { AppDataSource } from "../../../src/common/datasource";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    await AppDataSource.initialize();

    const user = new User({
        name: "유저1",
        nickname: "닉네임1",
        email: "user1@gmail.com",
    });

    const newUser = await AppDataSource.getRepository(User).save(user);

    try {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: newUser,
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
