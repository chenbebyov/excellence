const mongoose = require('mongoose')
const ObjectId = require('mongoose/lib/types/objectid')
const Schema = mongoose.Schema

const Student = new Schema(
    {
        email: { type:String, pattern:"^([_A-Za-z0-9-.]*@([A-Za-z0-9-]*)+((\\.com)|(\\.co.il)|(\\.net))$)", required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        password: { type: String, required: true },
        cellPhone: { type: String, required: false },
        address: { type: String, required: false },
        bornDate: { type: Date, required: false },
        userId : { type: ObjectId , required : true , ref:"users"},
        attendance: {
            type:[{
                groupId: {type: ObjectId, required:true, ref:'groups'},
                date: { type: Date, required: true, default:new Date() },
                present:{ type: Boolean, required: true }
            }],
            required: false
        }, 
        taskSubmission: {
            type:[{
               lessonId: { type: ObjectId, required: true, ref:'lessons' },
               linkToFile: { type: String, required: true },
               fileName: { type: String, required: true },
               dateSubmission: { type: Date, required: true, default:new Date() }
            }],
            required: false
        }, 
        borrowingBooks: {
            type:[{
                bookId: { type: ObjectId, required: true, ref:'books' },
                dateBorrowe: { type: Date, required: true, default:new Date() },
                endDateBorrowing: { type: Date, required: true },
                isReturned: { type: Boolean, required: true, default:false }
            }],
            required: false
        }, 
        messages: {
            type:[{
                subject: { type: String, required: true },
                messageContent: { type: String, required: true },
                dateMessage: { type: Date, required: true, default: new Date() },
                publisher: { type: ObjectId, required: true, ref:'users' },
                isRead: { type: Boolean, required: true, default: false }
            }],
            required: false
        }, 
    },
    { timestamps: true },
)

module.exports = mongoose.model('students', Student)
 

