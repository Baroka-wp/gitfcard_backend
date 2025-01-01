
const { authJwt } = require("../middleware");
const controller = require("../controllers/product.controller");
const upload = require('../middleware/upload');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/products/all", controller.getAll);

    app.get(
        "/api/product/:id",
        [authJwt.verifyToken],
        controller.getOne
    );

    app.post(
        "/api/product/",
        [authJwt.verifyToken,upload.single('image')],
        controller.create
    );
    app.post(
        "/api/product/:id",
        [authJwt.verifyToken, ],
        controller.update
    );
    app.delete(
        "/api/product/:id",
        [authJwt.verifyToken, ],
        controller.delete
    );
};
