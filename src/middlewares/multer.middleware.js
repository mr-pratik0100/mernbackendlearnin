import multer from "multer";


// we are using multer and cloudinary for file upload --> with the help of multer we take file from user and upload to our server and then with the help of cloudinary from our server we kept file to cloudinary server.



// this storage method return filename store on local system
const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        //************I have dount on this location of folder temp if file not proper uploading check from here ./public/temp */
        cb(null, './public/temp')
      },
      filename: function (req, file, cb) {
        
        cb(null, file.originalname)
      }
})

export const upload = multer({storage:storage})


//code taken from documentation because we have to store temp data on our local server so give only destination i.e imp change nothing different

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '/tmp/my-uploads')// only change destination on line no 24
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) //only erase line no27,28
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//   })
  
//   const upload = multer({ storage: storage })