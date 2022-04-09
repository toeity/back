const Noti = require('../Models/Noti');
const { fn, col } = require('sequelize')
exports.addNoti = (req, res) => {
    const eventData = {
        noti_static: req.body.noti_static
    }
    Noti.create(eventData).then(result => {
        return res.status(200).json({
            response: "noti create Success!!"
        })
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            response: "noti cannot created!!!"
        })
    })
}

exports.getAllNoti = (req, res) => {
    Noti.findAll().then(result => {
        return res.status(200).json({
            response: result
        })
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            response: "user error!!!"
        })
    })
}

exports.getAllNotiCount = (req, res) => {
    // console.log(noti_time);
    Noti.findAll({
        attributes: [
            [fn('count', col('noti_id')), 'notiCount'],
            [fn('month', fn('str_to_date', col('noti_time'), '%d/%m/%Y')), 'month']
        ],
        group: ['month'],
        where: {
            noti_static: 1
        }
    }).then((noti) => {
        let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        noti.forEach(n => {
            let value = n.toJSON();
            data[value.month - 1] = value.notiCount;
        })

        return res.status(200).json({
            noti: data,allAccident: (data.reduce((sum, num) => sum + num))
        })
    })
}


