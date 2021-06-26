const ErrorResponse = require('../utils/error.util');
const asyncHandler = require('../middleware/async.middleware');
const Bootcamp = require('../models/Bootcamp');


exports.getBootcamps =  asyncHandler(async (req,res,next) =>{

    const bootcamps = await Bootcamp.find().populate({
        path: 'courses',
        select: 'title minimumSkill'
    });
    res.status(200).json({ success: 'succcess', count: bootcamps.length, data: bootcamps});
    
});

exports.getBootcamp = asyncHandler(async (req , res, next) =>{

    const bootcamp = await Bootcamp.findById(req.params.id);

        if(!bootcamp){
           return next(new ErrorResponse(`Resource not found ${req.params.id}`, 404));
        }

    res.status(200).json({ success: 'succcess', data: bootcamp});
    
});

exports.createBootcamp = asyncHandler(async (req, res, next) =>{

    // Add user to body
    req.body.user = req.user.id

   // to save all data from req.body to mongodb database
   const bootcamp = await Bootcamp.create(req.body);
   res.status(200).json({ success: 'succcess', data: bootcamp});
});

exports.updateBootcamp = asyncHandler(async (req, res, next) =>{

    let bootcamp = await Bootcamp.findById(req.params.id);
    // console.log(req.user.role)

    if(!bootcamp){
        return next(new ErrorResponse(`Resource not found ${req.params.id}`, 404));
    }

    //make sure user is owner
    if(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin'){
        return next(new ErrorResponse(`${req.user.id} is not authorized`, 403));
    }

    bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true
    });

    res.status(200).json({ success: 'succcess', data: bootcamp});

});

exports.deleteBootcamp = asyncHandler(async (req, res, next) =>{

   const bootcamp = await Bootcamp.findById(req.params.id);

   if(!bootcamp){
    return next(new ErrorResponse(`Resource not found ${req.params.id}`, 404));
}

    bootcamp.remove();
   res.status(201).json({success: true, data: {}});

});