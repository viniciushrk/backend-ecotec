import {Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm"; 

@Entity("Users") 
class Users {  

   @ObjectIdColumn() 
   id: ObjectID; 
   
   @Column() 
   nome: string; 

   @Column() 
   email: string; 

   @Column() 
   senha: string; 

   @Column() 
   foto_user: string; 

   @Column()
   telefone: string;

   @CreateDateColumn()
   created_at: Date; 

   @UpdateDateColumn()
   update_at: Date; 
}

export default Users