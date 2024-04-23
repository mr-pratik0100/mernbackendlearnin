import mongoose from "mongoose";
const subscriptionSchema = new mongoose.Schema({
    subscriber:{
        type:mongoose.Types.ObjectId, //one who is subscribing
        ref:"User"
    },
    channel:{
        type:mongoose.Types.ObjectId, //one to whom subscriber is subscribing -> i.e also user
        ref:"User"
    }
},{timestamps:true})

export const Subscription=  mongoose.model(Subscription,"subscriptionSchema");