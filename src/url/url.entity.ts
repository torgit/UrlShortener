import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Url {
    @PrimaryColumn()
    id!: string;

    @Column()
    url: string;
}