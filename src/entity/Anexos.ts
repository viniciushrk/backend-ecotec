import { Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("Anexos")
class Anexos {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    caminho: string;

    @Column()
    tipo: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}

export default Anexos