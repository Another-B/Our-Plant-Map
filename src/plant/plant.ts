import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../common/base.entity";

@Entity({ name: "tb_plant" })
export class Plant extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "varchar", length: 100 })
    scientificName: number;
}
