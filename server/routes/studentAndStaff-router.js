const express = require('express');

const StudentAndStaffCtrl = require('../controllers/studentAndStaff-ctrl');

const router = express.Router();

router.post('/user/role', StudentAndStaffCtrl.setUserRole);
router.get('/student', StudentAndStaffCtrl.getStudent);
router.get('/staff', StudentAndStaffCtrl.getStaff);
router.post('/student/attendance', StudentAndStaffCtrl.setAttendence);

module.exports = router;