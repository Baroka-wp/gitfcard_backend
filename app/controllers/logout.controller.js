const db = require("../models");
const Blacklist = db.blacklist

module.exports = (req, res) => {
    const token = req.headers["x-access-token"];
    Blacklist.findOne({
        where : {
            token: token
        }
    }).then((blacklist) => {
        if (blacklist) {
            return res.status(204)
        }
        Blacklist.create({
            token: token,
        }).then(
            res.status(200).json({ message: 'You are logged out!' })
        ).catch(err => res.status(500).send({
            message: 'Internal Server Error',
        }))
    })
}