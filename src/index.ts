import "reflect-metadata";
import express, { Request, Response } from 'express';
import routes from './routes'
import AppError from './errors/AppError'

import './entity'
import { NextFunction } from "express";

const app = express();
app.use(express.json())


app.use(routes)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    console.error(err);

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});

app.listen(3333, () => {
    console.log('🚀🚀🚀🚀 Server started', 3333);
});