import { createConnection, Connection } from 'typeorm';

(async () =>{
    await createConnection();
})()
