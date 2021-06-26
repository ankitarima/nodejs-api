const express = require('express');

const { getCourses, getCourse, createCourse, updateCource, deleteCource } = require('../controllers/courses');
const { protect, authorize } = require('../middleware/auth.middleware');

const router = express.Router({ mergeParams: true});

router.route('/').get(getCourses).post(protect,authorize('publisher','admin'),createCourse);

router.route('/:id').get(getCourse).put(protect,authorize('publisher','admin'),updateCource).delete(protect,authorize('publisher','admin'),deleteCource);


module.exports = router;