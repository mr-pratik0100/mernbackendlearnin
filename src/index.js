// require('dotenv').config({path:'./env'})--> if we use this code will run proper but it will impact our code structure of import so we use import dotenv also we install pkg first of dotenv also we add some code i.e -r dotenv/config --experimental-json-modules this in pkg.json -> dev->script->between nodemon and src/index.js  --> vimp explaination for how to use import dotenv instead of require(dotenv);
import app from "./app.js"
import dotenv from "dotenv";
import connectDB from "./db/connection.js";


dotenv.config({
    path:"./.env"
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running on port no : ${process.env.port} `)
    })
})
.catch((error)=>{
    console.log("Mongo DB connection failed !!!",error)
})