import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../common/base.entity";

@Entity({ name: "tb_picture" })
export class Picture extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "bigint" })
    userId: number;

    @Column({ type: "bigint" })
    plantId: number;

    @Column({ type: "varchar" })
    originUri: string;

    @Column({ type: "varchar" })
    resizedUri: string;

    @Column({ type: "varchar" })
    latitude: string;

    @Column({ type: "varchar" })
    logitude: string;

    @Column({ type: "json" })
    metadata: object;
}
