import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema= new mongoose.Schema({
    videoFile:{
        type:String, //cloudinary
        require:true
    },
    thumbnail:{
        type:String, 
        require:true
    },
    title:{
        type:String, 
        require:true
    },
    description:{
        type:String, 
        require:true
    },
    duration:{
        type:Number, //cloudinary
        require:true
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }


},{timestamps:true});

videoSchema.plugin(mongooseAggregatePaginate)  // we are using mongoose plugin i.e mongooseAggregatePaginate first install from npm "npm i mongoose-aggregate-paginate-v2" then add import as above and also add in(mongooseAggregatePaginate);

export const Video = mongoose.model("Video",videoSchema);