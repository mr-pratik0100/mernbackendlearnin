import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async(req,res)=>{
      // 1. take user detatils from user
      // 2. check validation proper filled or not
      // 3. check user already exisst or not
      // 4. check for images or avtar
      // 5. upload them to cloudinary
      // 6. create user object --> create entry in db
      // 7. remove paasword and refresh token entry from response 
      // 8. check for user creation 
      // 9. return response.

      const {email,username,fullname,password} = req.body
      console.log("email is :",email);

     if(
      [fullname,email,username,password].some((field)=>field?.trim()==="")
     ){
      throw new ApiError(400,"all fields are required")
     }

     const existedUser = User.findOne({
      $or:[{username},{email}]
     })

     if(existedUser){
      throw new ApiError(409,"user with email or username already exist")
     }

    const avatarLocalPath=  req.files?.avatar[0]?.path;
    //console.log(avatarLocalPath);

    //req.files()-> mainly used when you work with multer it is similar to express -> req.body and that ? meaning is file can come or not means uploaded by user or not and . is used for chaining.
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
      throw new ApiError(400,"avatar image is required");
    }

   const avatar =  await uploadOnCloudinary(avatarLocalPath);
   const coverImage = await uploadOnCloudinary(coverImageLocalPath);

   if(!avatar){
    throw new ApiError(400,"avatar file is required");
   }

   const user = await User.create({
    fullname,
    email,
    password,
    username:username.toLowerCase(),
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
   })
   //here select method select what we don't want from db
   const createdUser =await User.findById(user._id).select(
    "-password -refreshToken"
   )

   if(!createdUser){
    throw new ApiError(500,"something went wrong while registering the user")
   }

   return res.status(202).json(
    new ApiResponse(201,createdUser,"user created successfully")
   )
   
})

export default registerUser