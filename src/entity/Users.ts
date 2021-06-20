import {Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm"; 

@Entity("Users") 
class Categoria {  

   @ObjectIdColumn() 
   id: ObjectID; 
   
   @Column() 
   nome: string; 

   @Column() 
   email: string; 

   @Column() 
   senha: string; 

   @CreateDateColumn()
   created_at: Date; 

   @UpdateDateColumn()
   update_at: Date; 
}

export default Categoria