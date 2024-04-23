import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true   //optimize searching
    },
    email:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        trim:true,
        
    },
    fullname:{
        type:String,
        require:true,
        lowercase:true,
        trim:true,
        index:true   
    },
    avatar:{
        type:String,  //cloudinary url  we can upload imges and videos and it give url in string.
        require:true
    },
    coverImage:{
        type:String  //cloudinary url
    },
    watchHistory:[
        
            {
                type:mongoose.Schema.Types.ObjectId,  //we are adding ref of video collection in user collection and here are two imp fields i.e type and ref. must--> here we are keeping watch history which is one array hold information about videos which are seen by user.
                ref:"Video"
            }
    ],
    password:{
        type:String,
        required:[true,"password is required"]
    },
    refreshToken:{
        type:String
    }
    

},{timestamps:true})



//This two important methds of bcrypt mostly used--> bcrypt and bcrypt.js are different 
// userSchema.pre("save",async function(next){
//     if(this.isModified("password")){
//        this.password=  bcrypt.hash(this.password,10);
//         next();
//     }else return next();
// })

// userSchema.methods.isPasswordCorrect=async function(password){
//      return await bcrypt.compare(password,this.password);
// }

//for practice purpose
userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    this.password =await bcrypt.hash(this.password,10);
    next();
})


userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password,this.password);
}

//access token is for short period & refresh token for long period
userSchema.methods.generateAccessToken= function(){
    return jwt.sign(
        {
            //this.id,this.username it is in db take from their and compare with local variable here
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }

    )
}

//only difference is between access token and refresh token is in access token you can take multiple payload and in refresh token mainly takes one i.e id also difference in usecase.
userSchema.methods.generateRefreshToken= function(){
    jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}



export const User = mongoose.model("User",userSchema); //--> in database it store as users.