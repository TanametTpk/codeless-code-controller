module.exports = (err , req , res , next) => {
    
    if (err.name === "IdentifyError")
        return res.unauthorized({
            error:err.message
        })

    next(err)

}