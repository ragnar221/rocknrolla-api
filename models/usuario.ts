import { Model, Models, Schema, model } from 'mongoose'
import { ROLES } from '../helpers/constants';

export interface IUser {
    nombre:string;
    email:string;
    password:string;
    rol?:string;
    code?:string;
    verified:boolean;

}

const userSchema = new Schema<IUser>({
    nombre: {
        type: String,
        required: [true, 'el nombre es obligatorio']
    },

    email: {
        type:String,
        required: [true, 'el email es obligatorio']
    },

    password: {
        type: String,
        required: [true, 'el password es obligatorio']
    },

    rol: {
        type: String,
        default: ROLES.user
    },

    code: {
        type: String,
    },

    verified: {
        type: Boolean,
        default: false
    }
})

userSchema.methods.toJSON = function() {
    const { __v, password, _id, code, ...usuario } = this.toObject();
    return usuario
}

const Usuario: Model<IUser> = model<IUser>("usuario", userSchema);

export default Usuario