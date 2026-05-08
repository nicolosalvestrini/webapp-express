function handleError (err,req,res,next){
    res.status(500)

    res.json({
        error: "Database query failed",
    })
}

module.exports = handleError