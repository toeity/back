const EventStudent = require('../Models/EventStudent');
const Leave = require('../Models/Leave');
const LeaveUser = require('../Models/LeaveUser');
const Student = require('../Models/Student');
const User = require('../Models/User');
const Event = require('../Models/Event');
const Car = require('../Models/Car');
exports.addEventStudent = (req, res) => {
    const eventData = {
        stu_id: req.body.stu_id,
        event_id: req.body.event_id,
        event_time: req.body.event_time
    }
    console.log(eventData)
    EventStudent.create(eventData).then(result => {
        return res.status(200).json({
            response: "eventstudent create Success!!"
        })
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            response: "eventstudent cannot created!!!"
        })
    })
}



exports.putEventStudent = async (req, res) => {
    const es = await EventStudent.findOne({
        where: {
            eid: req.body.eid
        }
    })
    await es.update({
        event_type: 1
    })
    await es.save();

    return res.status(200).json({
        response: "eventstudent create Success!!"
    })
}

exports.getAllEventStudent = (req, res) => {
    Student.belongsToMany(Event, { foreignKey: 'stu_id', through: EventStudent })
    EventStudent.belongsTo(Student, { foreignKey: 'stu_id' })
    EventStudent.belongsTo(Event, { foreignKey: 'event_id' })
    Event.belongsToMany(Student, { foreignKey: 'event_id', through: EventStudent })
    Student.belongsTo(User, { foreignKey: 'user_id' })
    EventStudent.findAll({
        where: {
            event_type: 0
        },
        include: [
            Event,
            { model: Student, include: User }
        ]
    }).then(result => {
        console.log(result.map(i => i.toJSON())[0]);
        return res.status(200).json({
            response: result
        })
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            response: "eventstudent error!!!"
        })
    })
}

exports.getAllEventStudentOne = (req, res) => {
    Student.belongsToMany(Event, { foreignKey: 'stu_id', through: EventStudent })
    EventStudent.belongsTo(Student, { foreignKey: 'stu_id' })
    EventStudent.belongsTo(Event, { foreignKey: 'event_id' })
    Event.belongsToMany(Student, { foreignKey: 'event_id', through: EventStudent })
    Student.belongsTo(User, { foreignKey: 'user_id' })
    EventStudent.findAll({
        where: {
            event_type: 1
        },
        include: [
            Event,
            { model: Student, include: User }
        ]
    }).then(result => {
        return res.status(200).json({
            response: result
        })
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            response: "eventstudent error!!!"
        })
    })
}

exports.getAllEventStudentToBoss = (req, res) => {
    const { car_no } = req.params
    console.log(car_no, req.params);
    Student.belongsToMany(Event, { foreignKey: 'stu_id', through: EventStudent })
    EventStudent.belongsTo(Student, { foreignKey: 'stu_id' })
    EventStudent.belongsTo(Event, { foreignKey: 'event_id' })
    Event.belongsToMany(Student, { foreignKey: 'event_id', through: EventStudent })
    Student.belongsTo(User, { foreignKey: 'user_id' })
    EventStudent.findAll({
        where: {
            event_type: 1,
        },
        include: [
            Event,
            {
                required:true,
                model: Student, include: {
                    model: User, required: true, where: {
                        car_no

                    }
                }
            }
        ]
    }).then(result => {
        return res.status(200).json({
            response: result
        })
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            response: "eventstudent error!!!"
        })
    })
}