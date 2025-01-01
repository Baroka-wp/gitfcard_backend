
const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.product = require("../models/product.model.js")(sequelize, Sequelize);
db.blacklist = require("../models/blacklist.model.js")(sequelize, Sequelize);

const WishList = require('../models/wishlist.model.js')(sequelize);
const Wish = require('../models/wish.model')(sequelize);
const Category = require('../models/category.model')(sequelize);
const Product = require('../models/product.model.js')(sequelize);

db.wishlist = require('../models/wishlist.model.js')(sequelize);
db.wish = require('../models/wish.model')(sequelize);
db.category = require('../models/category.model.js')(sequelize);

db.product.associate({ Category });
db.category.associate({ Product });

db.wish.associate({ WishList });
db.wishlist.associate({ Wish });

db.role.belongsToMany(db.user, {
    through: "user_roles"
});
db.user.belongsToMany(db.role, {
    through: "user_roles"
});

db.ROLES = ["user", "admin"];

module.exports = db;