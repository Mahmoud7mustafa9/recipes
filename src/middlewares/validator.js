import { AppError } from "../utils/AppError"

export const validate = (schema)=>{

    return(req,res,next)=>{

const data = {...req.body,...req.query,...req.params,image:req.file}

const {error} = schema.validate(data,{abortEarly:false})

if (error) {

    const messageError = error.details.map((err)=> err.message)
     
    return next(new AppError(messageError,401))
}
else {
    next()
}

    }

}