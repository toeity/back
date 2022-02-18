let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
const Student = require('../Models/Student');
const Event = require('../Models/Event');
const event_student = require('../Models/EventStudent')
// let students = [
//    {name: "Joy",
//     email: "joy@example.com",
//     city: "New York",
//     country: "USA"},
//    {name: "John",
//     email: "John@example.com",
//     city: "San Francisco",
//     country: "USA"},
//    {name: "Clark",
//     email: "Clark@example.com",
//     city: "Seattle",
//     country: "USA"},
//    {name: "Watson",
//     email: "Watson@example.com",
//     city: "Boston",
//     country: "USA"},
//    {name: "Tony",
//     email: "Tony@example.com",
//     city: "Los Angels",
//     country: "USA"
// }];

exports.generatePDFTemplate2 = (req, res) => {
    // let readTemplate = path.join(__dirname,'../Document', 'report-template.ejs') //on linux or windows
    let readTemplate = path.join('Document', 'reportevent-template.ejs') //on macOS
    let newFileName = `pdf-${Date.now()}`;
    // let pathPDF = path.join(__dirname,'../Other/pdf', newFileName+'.pdf');//on linux or windows
    let pathPDF = path.join('Other/pdf', newFileName + '.pdf');//on linux or windows
    Student.belongsToMany(Event, { through: event_student, foreignKey: 'stu_id' })
    Event.belongsToMany(Student, { through: event_student, foreignKey: 'event_id' })
    Student.findAll({
        include: Event
    }).then((dataStudent) => {
        if (dataStudent) {
           
           
            ejs.renderFile(readTemplate, {student: dataStudent }, (err, data) => {
                if (err) {
                    res.send(err);
                } else {
                    let options = {
                        "height": "8.5in",
                    "width": "11.25in",
                    "header": {
                        "height": "20mm"
                    },
                    "footer": {
                        "height": "20mm",
                    },
                    };
                    pdf.create(data, options).toFile(pathPDF, function (err, data) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.send("File created successfully");
                        }
                    });
                }
            });
        }
    })
}

exports.getPDF = (req, res) => {
    try {
        let pathPDF = path.join(__dirname, '../Other/pdf', req.params.id + '.pdf'); //on linux or windows
        // let pathPDF = path.join('Other/pdf', req.params.id+'pdf'); //on macOS
        res.sendFile(pathPDF);
    } catch (err) {
        res.status(500).send(err.message);
    }
}