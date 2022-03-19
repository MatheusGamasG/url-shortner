// import { prop, Typegoose } from '@hasezoey/typegoose';

// export class URL extends Typegoose {
//     @prop({required: true})
//     hash:string

//     @prop({required:true})
//     originURL:string

//     @prop({required:true})
//     shortURL:string
// }

// export const URLModel = new URL().getModelForClass(URL);

import mongoose from "mongoose";
const { Schema } = mongoose;

const URLSchema = new Schema({
    hash: String,
    originURL: String,
    shortURL: String
}) 

export const URLModel = mongoose.model('urlshortner', URLSchema)
