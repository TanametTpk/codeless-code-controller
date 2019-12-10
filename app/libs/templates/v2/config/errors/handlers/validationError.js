module.exports = (err , req , res , next) => {
    
    if (err.name === "ValidationError" || err.name === "CastError")
        return res.preconditionFailed({
            error:err.message
        })
        
    next(err)
}