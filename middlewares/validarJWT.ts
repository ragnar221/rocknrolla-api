import { NextFunction, Request, Response } from "express";
import  Jwt, { JwtPayload } from "jsonwebtoken";
import Usuario, { IUser } from "../models/usuario";

const validarJWT = async(req: Request, res:Response, next:NextFunction):Promise<void> => {
    const token = req.headers["x-token"] as string ;

    if(!token){
        res.status(401).json({
            msj: "No se encontro un token en la petición"
        })
        return;
    }

    try{
        const claveSecreta = process.env.CLAVESECRETA as string;
        const payload = Jwt.verify(token, claveSecreta) as JwtPayload;
        const {id} = payload;
        
        const usuarioConfirmado: IUser | null = await Usuario.findById(id);
        
        if(!usuarioConfirmado){
            res.status(401).json({
                msj:"Token no valido"
            })
            return;
        }
        req.body.usuarioConfirmado = usuarioConfirmado;

        req.body.id = id;

        next();

    }catch(error){
        console.log(error);
        res.status(401).json({
            msj: "Token no valido"
        })
        
    }
}

export default validarJWT;