import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport ({
    service:"gmail",
    auth: {
        
        user:"rocknrolla.leatherstore@gmail.com",
        pass:"ufzb yitg wttb kmwt"
    },

    from: "rocknrolla.leatherstore@gmail.com"
})

export const sendEmail = async(to:string, code:string): Promise<void> => {
    try{
        const mailOptions = {
            form: '"RockNrolla""rocknrolla.leatherstore@gmail.com"',
            to,
            subject: "codigo de activacion para tu cuenta",
            text: `
            Ya casi terminas! introduce el codigo en la pagina de rockNrolla para completar tu registro
            el codigo para verificarte es ${code}
            `
        }

        await transporter.sendMail(mailOptions);
        console.log('correo electronico enviado')

    } catch(error){
        console.error('error al enviar el correo electronico')
    }
}