export const globleError = (err,req,res,next)=>{

    let code = err.statusCode || 500 ;

    res.status(code).json({error:"error",message:err,code,stack:err.stack})
}