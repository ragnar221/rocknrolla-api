import { Request, Response, NextFunction } from "express";

export const isVerified = (req:Request, res: Response, next: NextFunction) => {
    const { verified } = req.body.usuarioConfirmado;

    if(!verified){
        res.status(401).json({
            msj:" El usuario no esta correctamente verificado"
        })
        return;
    }
    next()
}