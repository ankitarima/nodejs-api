const ErrorResponse = require('../utils/error.util');
const asyncHandler = require('../middleware/async.middleware');
const User = require('../models/User')

exports.register = asyncHandler((async (req, res, next)=>{
    const { name, email, password, role } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        role
    });

    //create token
    const token = user.getSignedJWT();

    res.status(200).json({success:true, token:token})

}))

exports.login = asyncHandler((async (req, res, next)=>{
    const { email, password } = req.body;

    //Validate email and password
    if(!email || !password){
        return next(new ErrorResponse('Please provide email and password', 400))
    }

    //Check for user
    const user = await User.findOne({email}).select('+password');

    if(!user){
        return next(new ErrorResponse('Invalid credentials', 401))
    }

    //Check for password
    const isMatch = await user.matchPassword(password)

    if(!isMatch){
        return next(new ErrorResponse('Invalid credentials', 401))
    }

    //create token
    const token = user.getSignedJWT();

    res.status(200).json({success:true, token:token})

}))

exports.getUser = asyncHandler((async (req, res, next)=>{

    const user = await User.findById(req.user.id)

    res.status(200).json({success:true, data:user})

}))

exports.forgotPassword = asyncHandler((async (req, res, next)=>{

    const user = await User.findById(req.user.id)

    res.status(200).json({success:true, data:user})

}))