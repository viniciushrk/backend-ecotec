import {Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn,JoinColumn, OneToOne} from "typeorm"; 

@Entity("ItensReciclaveis") 
class ItensReciclaveis {  

   @ObjectIdColumn() 
   id: ObjectID; 
   @ObjectIdColumn()
   public _id: ObjectID;

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
   
   preco_format: string;
   // @OneToOne(() => Anexos, anexo => anexo.id)
   // @JoinColumn()
   // Image: Anexos;
   @Column()
   user: any;

   @CreateDateColumn()
   created_at: Date; 

   @UpdateDateColumn()
   update_at: Date; 
}

export default ItensReciclaveis