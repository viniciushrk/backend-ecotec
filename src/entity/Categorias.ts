import { Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("Categoria")
class Categoria {

   @ObjectIdColumn()
   id: ObjectID;

   @Column()
   name: string;

   @Column()
   imagem: string;

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   update_at: Date;
}

export default Categoria