import { IUser } from "../models/usuario";
import Usuario  from "../models/usuario";
import { sendEmail } from "../mailer/mailer";


export const existeEmail = async(email:string): Promise<void> => {
    const existeEmail: IUser | null = await Usuario.findOne({email})

    if(existeEmail && existeEmail.verified){
        throw new Error(`la direccion de ${email} recibido ya esta registrado`);
        
    }

    if(existeEmail && !existeEmail.verified){
        await sendEmail(email, existeEmail.code as string)
        throw new Error(`el usuario ya se encuentra registrado. Se envió el mail de verificacion a ${email}`)
    }
}