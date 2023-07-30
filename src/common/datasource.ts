import "reflect-metadata";
import { DataSource } from "typeorm";
import { Picture } from "../plant/picture";
import { Plant } from "../plant/plant";
import { Group } from "../user/group";
import { User } from "../user/user";
import { UserGroup } from "../user/user.group";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "test",
    port: 3306,
    username: "test",
    password: "test",
    database: "test",
    entities: [Picture, Plant, Group, User, UserGroup],
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy(),
});

export const initDataSource = async () =>
    await AppDataSource.initialize()
        .then(() => {
            console.log("DB has been initialized");
        })
        .catch((err) => {
            throw err;
        });

initDataSource();
