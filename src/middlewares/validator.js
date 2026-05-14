export const validator = (schema)=>{
    return(req,res,next)=>{
        let {error} = schema.validate(req.body,{abortEarly:false})

if (error) {
     res.json(error.message)
}
else {
    next()
}

    }

}