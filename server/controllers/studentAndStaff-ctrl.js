const Staff = require('../models/staff-model');
const Student = require('../models/student-model');
const { getUserById } = require('../controllers/user-ctrl');
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var generator = require('generate-password');
const ObjectId = require('mongoose/lib/types/objectid')
const {getRegisteredMessage} = require('../general/email-templates');
const sendEmailJoining = require('../general/emails-ctrl');


setUserRole = (req, res) => {
    const { body } = req;
    
    if(!body){
        return res.status(400).json({
            success: false,
            error: 'Failed to set user role, details are empty.',
        })
    }

    const { role , userId } = body;

    getUserById(userId).then(user => {

        if(!user){
            return res
            .status(404)
            .json({ success: false, error: `User not found` })
        }

        if(role == 'student') {
            createStudent(user).then(student => {
                return res.status(200).json({
                    success: true,
                    student: student,
                    message: 'student created!',
                })
            })
        }
        else {
            createStaff(user, role).then(staff => {
                return res.status(200).json({
                    success: true,
                    staff: staff,
                    message: 'staff created!',
                })
            })
        }


    }).catch(err => { 
        debugger
        console.log(err);
        return res.status(400).json({ success: false, error: 'user id not found' })
    });
}


getRandomPassword = () => {
    return generator.generate({
        length: 10,
        numbers: true
    });
}

createStaff = (user, role) => {

    const staff = new Staff();
    staff.email = user.email;
    staff.firstName = user.firstName;
    staff.lastName = user.lastName;
    staff.password = getRandomPassword();
    staff.userId = user._id;
    staff.role = role;
    staff.save().then(() => {
        let template = getRegisteredMessage(staff.firstName);
        sendEmailJoining(staff.email, 'הצטרפת כצוות ל Excellence', template, false,staff.password);
        return res.status(200).json({
            success: true,
            staff: staff,
            message: 'staff created',
        })
    })
    .catch(error => {
        return res.status(400).json({
            error,
            message: 'staff not created!',
        })
    })
}

createStudent = (user) => {

    const student = new Student();
    student.email = user.email;
    student.firstName = user.firstName;
    student.lastName = user.lastName;
    student.password = getRandomPassword();
    student.userId = user._id;
    student.save().then(() => {
        let template = getRegisteredMessage(student.firstName);
        sendEmailJoining(student.email, 'הצטרפת כתלמיד ל Excellence', template, false,student.password);
        return res.status(200).json({
            success: true,
            student: student,
            message: 'student created',
        })
    })
    .catch(error => {
        return res.status(400).json({
            error,
            message: 'student not created!',
        })
    })
};


getStudent = async (req, res) => {
    await Student.find({}, (err, student) => {

        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!student.length) {
            return res
                .status(404)
                .json({ success: false, error: `mmmm` })
        }
        return res.status(200).json({ success: true, data: student })
    }).catch(err => console.log(err))
}

getStaff = async (req, res) => {
    await Staff.find({}, (err, staff) => {

        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!staff.length) {
            return res
                .status(404)
                .json({ success: false, error: `mmmm` })
        }
        return res.status(200).json({ success: true, data: staff })
    }).catch(err => console.log(err))
}

setAttendence = async (req, res) => {

    try {
        const { body } = req;
        
        if(!body){
            return res.status(400).json({
                success: false,
                error: 'Failed to set attendence, details are empty.',
            })
        }
        
        const {userAttendance} = body;

        let bulkArr = [];

        for (const item of userAttendance) {
            bulkArr.push({
                updateOne: {
                    "filter": { "_id": new ObjectId(item.studentId) },
                    "update": { $push: { attendance: {present : item.present, groupId: new ObjectId(item.groupId)} } }
                }
            })
        }

        await Student.bulkWrite(bulkArr);
        return res.status(200).json({ success: true })
    }
    catch(error) {
        return res.status(400).json({ success: false, error: 'user id not found' });
    }
} 



module.exports = {
    getStudent,
    getStaff,
    setUserRole,
    setAttendence
}