import {Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn,JoinColumn, OneToOne} from "typeorm"; 

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
   
   @Column()
   user_id: ObjectID;
   
   @Column()
   categoria_id: ObjectID;

   @Column()
   preco: number;

   // @OneToOne(() => Anexos, anexo => anexo.id)
   // @JoinColumn()
   // Image: Anexos;

   @CreateDateColumn()
   created_at: Date; 

   @UpdateDateColumn()
   update_at: Date; 
}

export default ItensReciclaveis