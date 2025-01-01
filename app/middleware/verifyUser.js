
const db = require("../models");
const {Wishlist} = require("../models");
const User = db.user;

module.exports = (req, res, next) => {
    const { email } = req.body;
    const { wishlistId} = req.params;

    Wishlist.findByPk(wishlistId).then((wishlist) => {
        if (wishlist) {
            const user = User.findOne({
                where: { email },
            })
            if (!user) {
                res.status(404).json({message: "User not found"});
                return
            }

            if (user.email !== wishlist.client) {
                res.status(403).json({message: "User not authorized"});
                return;
            }
            next()
        }
        res.status(404).json({message: "Wishlist not found"});
    }).catch((err)=> {
        return res.status(500).json(err.message);
    });
}
