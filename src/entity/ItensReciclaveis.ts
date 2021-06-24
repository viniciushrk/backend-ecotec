import {Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn,JoinColumn, OneToOne} from "typeorm"; 
import Anexos from "./Anexos";

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

   // @OneToOne(() => Anexos, anexo => anexo.id)
   // @JoinColumn()
   // Image: Anexos;

   @CreateDateColumn()
   created_at: Date; 

   @UpdateDateColumn()
   update_at: Date; 
}

export default ItensReciclaveis