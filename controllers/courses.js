const ErrorResponse = require('../utils/error.util');
const asyncHandler = require('../middleware/async.middleware');
const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');

exports.getCourses = asyncHandler(async (req, res, next) => {
 let query;

  if( req.params.bootcampId){
      query = Course.find({bootcamp: req.params.bootcampId}).populate({
          path: 'bootcamp',
          select: 'name description'
      });
  }else{
      query = Course.find().populate('bootcamp');
  }

  const courses = await query; 
  res.status(200).json({succcess: true, count: courses.length, data: courses});
});

exports.getCourse = asyncHandler(async (req, res, next) => {

    const course = await Course.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'
    });
    if(!course){
        return next(new ErrorResponse(`No resource with ${ req.params.id}`))
    }
    
    res.status(200).json({succcess: true, data: course});
   });

   exports.createCourse = asyncHandler(async (req, res, next) => {

    req.body.bootcamp = req.params.bootcampId;

    const bootcamp = await Bootcamp.findById(req.body.bootcamp);

    if(!bootcamp){
        return next (new ErrorResponse(`Resource not found with ${req.body.bootcamp}`));
    }

    const course = await Course.create(req.body);

    res.status(200).json({succcess: true, data: course});


   });

   exports.updateCource = asyncHandler( async (req, res, next ) => {

    const cource = await Course.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators: true
    });

    if(! cource){
        return next( new ErrorResponse(`Resource not found with ${req.params.id}`));
    }

    res.status(200).json({succcess:true, data: cource});

   });

   exports.deleteCource = asyncHandler( async (req, res, next ) =>{

    const course = await Course.findById(req.params.id);

    if(!course){
        return next(new ErrorResponse(`No resource with ${ req.params.id}`))
    }

    course.remove();

    res.status(200).json({succcess:true, data:{}});

   });
   