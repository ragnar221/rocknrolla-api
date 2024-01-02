import { Model, Schema, model, Types, ObjectId } from "mongoose";


export interface IIssue {
    title:string,
    description:string,
    priority:number,
    user:Types.ObjectId,
    createdAt:Date
}

const IssuesSchema = new Schema <IIssue>({
    title: {
        type: String,
        required: [true, "el titulo es obligatorio"]
    },
    description: {
        type: String,
        required: [true, "la descripcion es obligatoria"]
    },
    priority: {
        type:Number,
        required: [true, "la prioridad es obligatoria"]
    },
    user: {
        type:Schema.Types.ObjectId,
        ref:"Usuario",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
    
})

const Issue: Model<IIssue> = model<IIssue>("Issue", IssuesSchema);

export default Issue