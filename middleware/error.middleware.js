const ErrorResponse = require('../utils/error.util');
const errorHandler = (err, req, res, next) => {
let error = {...err};
// console.log(err);

error.message = err.message;
if( err.name === 'CastError') {
 error = new ErrorResponse(`Resource not found`, 404);
}

// error handling for duplicate entry
if( err.code === 11000) {
    error = new ErrorResponse(`Duplicate entry`, 400);
}

if( err.name === 'ValidationError'){

    const message = Object.values(err.errors).map(val=>val.message);
    error = new ErrorResponse( message, 400);
}

// custome error code and message generator
res.status(error.statusCode || 500).json({ sucess: false, data: error.message || ' Server Error'});

}

module.exports = errorHandler;