
const checkUser = require('../middleware/verifyUser.js');
const { authJwt } = require("../middleware");
const controller = require("../controllers/wishlist.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/wishlist/:wishlistId", controller.getWishlist);

    app.post(
        "/api/wishlist",
        [authJwt.verifyToken],
        controller.createWishlist
    );

    app.post(
        "/api/wishlist/add/wish",
        [authJwt.verifyToken],
        controller.updateWishlist
    );

    app.post(
        "/api/wishlist/remove/:wishId",
        [authJwt.verifyToken],
        controller.removeWish
    );

    app.delete(
        "/api/wishlist/:id",
        [authJwt.verifyToken],
        controller.deleteWishlist
    );
};