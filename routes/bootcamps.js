const express = require('express');

const { getBootcamps, getBootcamp, createBootcamp, deleteBootcamp, updateBootcamp } = require('../controllers/bootcamps');
const { protect, authorize } = require('../middleware/auth.middleware');

const courseRouter = require('./courses');


const router = express.Router();

router.use('/:bootcampId/courses', courseRouter)


router.route('/').get(getBootcamps).post(protect, authorize('publisher','admin'), createBootcamp);

router.route('/:id').get(getBootcamp).put(protect, authorize('publisher','admin'), updateBootcamp).delete(protect,authorize('publisher','admin'),deleteBootcamp);


module.exports = router;