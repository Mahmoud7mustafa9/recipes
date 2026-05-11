export const catchError = (theFunc)=>{
return(req,res,next)=>{
    theFunc(req,res,next).catch((error)=>{
     next(error)
    })
}

}