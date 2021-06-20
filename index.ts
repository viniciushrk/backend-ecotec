import "reflect-metadata";
import express from 'express';
import routes from './routes'

import './src/entity'

const app = express();
app.use(express.json())


app.use(routes)

app.listen(3333, () => {
    console.log('🚀🚀🚀🚀 Server started', 3333);
});