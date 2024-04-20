
const asyncHandler = (requestHandler) => {
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
    }
}




//By async await


// const asyncHandler = (pratik) => async(req,res,next) => {
//     try{
//         await pratik(req,res,next)
//     }catch(err){
//         res.status(err.code || 500).json({
//             success:false,
//             message:err.message
//         })
//     }
// }


export default asyncHandler;





























