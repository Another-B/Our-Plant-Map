import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../common/base.entity";

@Entity({ name: "tb_user" })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 20 })
    name: string;

    @Column({ type: "varchar", length: 30 })
    nickname: string;

    @Column({ type: "varchar" })
    email: string;
}
