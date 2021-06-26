const express = require('express');
const cors = require('cors');
const dotEnv = require('dotenv');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xssClean = require('xss-clean');
const expressRateLimit = require('express-rate-limit');
const hpp = require('hpp');
const dbconnect = require('./config/dbconnect');
const errorHandler = require('./middleware/error.middleware');

// Load env config
dotEnv.config({ path: './config/config.env'});
// Databse connection
dbconnect();

// Loading Router files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');

// Intializing main express app
const app = express();
app.use(cors());
app.use(express.json());

//Security

const limiter = expressRateLimit({
    windowMs: 10*60*1000,
    max: 100
});

app.use(mongoSanitize())
app.use(helmet())
app.use(xssClean())
app.use(hpp())
app.use(limiter);


// useing route and controller
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);

// errorHandler middleware

app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, console.log('server started'));