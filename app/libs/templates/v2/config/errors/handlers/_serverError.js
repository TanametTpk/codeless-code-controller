module.exports = (err , req , res , next) => {

    if (err)
        return res.serverError({
            error:"server unavailable",
            msg:err.message
        })

    next(err)
}