import {Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm"; 

@Entity("ItensReciclaveis") 
class ItensReciclaveis {  

   @ObjectIdColumn() 
   id: ObjectID; 
   
   @Column() 
   nome: string;
   
   @Column() 
   descricao: string;

   @Column() 
   itens: Array<string>;

   @Column()
   imagem: string;

   @CreateDateColumn()
   created_at: Date; 

   @UpdateDateColumn()
   update_at: Date; 
}

export default ItensReciclaveis