import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../common/base.entity";

@Entity({ name: "tb_user_group" })
export class UserGroup extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "bigint" })
    groupId: number;

    @Column({ type: "bigint" })
    userId: number;
}
