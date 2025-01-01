
const { authJwt } = require("../middleware");
const controller = require("../controllers/category.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/category/all", controller.getAll);

    app.get(
        "/api/category/:id",
        [authJwt.verifyToken],
        controller.getOne
    );

    app.post(
        "/api/category/",
        [authJwt.verifyToken,],
        controller.create
    );
    app.post(
        "/api/category/:id",
        [authJwt.verifyToken, ],
        controller.update
    );
    app.delete(
        "/api/category/:id",
        [authJwt.verifyToken, ],
        controller.delete
    );
};
