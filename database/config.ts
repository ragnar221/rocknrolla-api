import mongoose from "mongoose";

export const dbConnection = async (): Promise <void> => {
   try{
     const dbUrl = process.env.DB_URL;
     if (!dbUrl){
      throw new Error('La URL no se definio correctamente en los .env');
     }
     await mongoose.connect(dbUrl)

     console.log('base de datos conectada con exito');
     
   }
   catch(error)
     {
      console.log(error);
      throw new Error('error al iniciar la base de datos');
      
   }
}