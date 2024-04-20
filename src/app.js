import express from "express";
import cookieParser from "cookie-parser"; 
import cors from "cors";

const app = express();

//all origins are allowed.
app.use(cors())


//in backend data come from body,url i.e params,json format so we want common data so we use middleware i.e express.json--> to accept json()--> that object in used in production file to restric unlimitted json data
app.use(express.json({limit:"16kb"}));


//data come through url to encode that i.e %20 means space
app.use(express.urlencoded({extended:true,limit:"16kb"}));


//to serve static files--> in public folder
app.use(express.static("public"));


//-> we use this to take accesss of cokkies of client and to set it from server i.e to perform crud.
app.use(cookieParser())














export default app;