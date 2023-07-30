import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../common/base.entity";

@Entity({ name: "tb_group" })
export class Group extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    name: string;
}
