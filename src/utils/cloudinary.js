import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';       


// we are using multer(middleware) and cloudinary for file upload --> with the help of multer we take file from user and upload to our server and then with the help of cloudinary from our server we kept file to cloudinary server.


cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME , 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localfilepath) => {
    try{
        if(! localfilepath)return null;
        const response = await cloudinary.uploader.upload(localfilepath,{
            resource_type:'auto'
        })
        console.log(`file uploaded successfully on cloudinary and public url is : -> ${response.url}`);
        return response;

    }catch(error){
        fs.unlinkSync(localfilepath) // now if control come here means filepath got but it is not uploaded on cloudinary it is on our local server so delete that file we use this line
        return null;
    }
}

 export {uploadOnCloudinary}
// export default uploadOnCloudinary;

//direct taken from documentation it work fine but we have handle error also so our code is good take help of this boiler plate code help for syntax 

// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });