import express, {Express} from "express";
import cors from 'cors';
import { dbConnection } from "../database/config";
import authRoutes from "../routes/auth"
import orderRoutes from "../routes/orders";
import issuesRoutes from "../routes/issues";


export class Server {
    app: Express;
    port: string | number | undefined;
    authPath: string;
    ordersPath: string;
    issuesPath: string;

    constructor(){
        this.app=express();
        this.port= process.env.PORT
        this.authPath= '/auth'
        this.ordersPath= '/checkout'
        this.issuesPath='/issues'

        this.conectarDB();

        this.middlewares();

        this.routes();
    }

    async conectarDB(): Promise<void> {
        await dbConnection();
    }

    middlewares(): void {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes():void {
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.ordersPath, orderRoutes);
        this.app.use(this.issuesPath, issuesRoutes)
    }

    listen(): void {
        this.app.listen(this.port, ()=> {
            console.log(`corriendo en el puerto ${this.port}`)
            
        })
    }
}
