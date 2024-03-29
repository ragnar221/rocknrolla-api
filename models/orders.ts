import { Model, Schema, Types , model } from "mongoose";

interface IShippingDetails {
    name: string;
    cellphone: string;
    location: string;
    address: string;
}

interface IItem {
    img: string;
    id: number;
    price: number;
    quantity: number;
    name: string;
}

export interface IOrder {
    createdAt: Date;
    user: Types.ObjectId;
    price: number;
    shippingCost: number;
    items: IItem[];
    shippingDetails: IShippingDetails;
    status:string;
    total: number;
}

const orderSchema = new Schema <IOrder>({
    createdAt:{
        type:Date,
        default:Date.now
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:"Usuario",
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    shippingCost: {
        type:Number,
        required:true
    },
    items:{
        type:[{
            img:{
                type:String,
                required:true
            },
            id:{
                type:Number,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            name:{
                type: String,
                required:true
            },
        }],
        required:true
    },
    shippingDetails:{
        name:{
            type:String,
            required:true
        },
        cellphone:{
            type:String,
            required:true
        },
        location:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        }
    },
    status:{
        type:String,
        required:true
    },
    total:{
        type:Number,
        required:true
    }
})

export const Order = Model<IOrder> = model<IOrder>("Order", orderSchema)

export default Order