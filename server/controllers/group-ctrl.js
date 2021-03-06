const Layer = require('../models/layer-model');
const ObjectId = require('mongoose/lib/types/objectid');


updateGroup = (req, res) => {
    const body = req.body;

    if (!body || !body.groupId) {
        return res.status(400).json({
            success: false,
            error: 'Failed to update group, details are empty.',
        })
    }
    // Layer.aggregate([
    //     { $unwind: "$grades"},
    //     { $unwind: "$grades.levels"},
    //     { $unwind: "$grades.levels.groups"},
    //     {
    //         $match: {
    //             "grades.levels.groups._id": body.groupId
    //         }
    //     }
    // ]).then(group => {
    //     if (group) {
    //         return res.status(200).json({
    //             success: true,
    //             data:group
    //         })
    //     }
        
    // }).catch(err => res.status(400).json({ success: false, error: err }));


    // Group.find({}).then(group => {
    //     if (group) {
    //         return res.status(200).json({
    //             success: true,
    //             data:group
    //         })
    //     }
        
    // }).catch(err => res.status(400).json({ success: false, error: err }));

    // .findOne({
    //     ...    "blog_id" : ObjectId("56587befdb7224110f007233")
    //     ... },{
    //     ...    "comments": { $elemMatch: { _id: ObjectId("565f1034fd07cbfc1129db0b") } }
    //     ... })
    
    // Layer.findOne({"grades.levels.groups._id" : body.groupId},"grades.levels.groups.$").then(group => {
    //     if (group) {
    //         return res.status(200).json({
    //             success: true,
    //             data:group
    //         })
    //     }

    // }).catch(err => res.status(400).json({ success: false, error: err }));
    // Layer.findOne({"grades.levels.groups._id" : body.groupId},"grades.levels.groups.$").then(group => {
    //     if (group) {
    //         return res.status(200).json({
    //             success: true,
    //             data:group
    //         })
    //     }

    // }).catch(err => res.status(400).json({ success: false, error: err }));

    let {groupId, name, teacherCode, StudentsInTheGroup} = body;

    Layer.findOne({'grades.levels.groups._id': groupId}).then(layer => {

        if (layer) {

            for(let grade of layer.grades) {
                for(let level of grade.levels) {
                    for(let group of level.groups) {
                        if(group._id == body.groupId) {
                            group.name = name;
                            group.teacherCode = teacherCode;
                            group.StudentsInTheGroup = StudentsInTheGroup;
                            layer.save().then(() => {
                                return res.status(200).json({
                                    success: true,
                                    group: group,
                                    message: 'group updated!',
                                })
                            }).catch(error => {
                                return res.status(400).json({
                                    error,
                                    message: 'group not updated!',
                                })
                            });
                        }
                    }
                }
            }

            // return res.status(400).json({
            //     success: false,
            //     error: 'group not found.',
            // })
        }

    }).catch(err => res.status(400).json({ success: false, error: err }));


    // name:groupName,
    // teacherCode: selectedTeacher,
    //         StudentsInTheGroup: selectedStudents.map(student => 
    //             ({studentCode: student._id})
    //         )

    // Layer.aggregate()
    // .match({'grades.levels.groups._id': body.groupId})
    // .project({
    //     'groups': {
    //         '$filter': {
    //             'input': '$groups',
    //             'cond': {
    //                 '$eq': ['$$groups._id', body.groupId]
    //             }
    //         }
    //     }
    // })
    // .exec(function (err, res) {
    //     if (err) return handleError(err);
    //     console.log(res); // [ { orders: [...] } ]
    // });

    //TODO:...
}


module.exports = {
    updateGroup
}