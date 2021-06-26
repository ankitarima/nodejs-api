const jwt = require('jsonwebtoken')
const asyncHandler = require('./async.middleware')
const ErrorResponse = require('../utils/error.util')
const User = require('../models/User')

exports.protect = asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token){
        return next(new ErrorResponse('Not authorized',401))
    }

    try {
        //verify token
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id)
        // console.log(decoded)
        next()
    } catch (err) {
        return next(new ErrorResponse('Not authorized',401))
    }
})

exports.authorize = (...roles) =>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorResponse(`${ req.user.role} is not authorized`,403))
        }
        next()
    }
}