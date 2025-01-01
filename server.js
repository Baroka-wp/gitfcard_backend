const express = require("express");
const cors = require("cors");
const path = require('path');

const app = express();

corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to gift application." });
});

require('./app/routes/product.routes')(app);
require('./app/routes/wishlist.routes')(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/category.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
const Role = db.role;

db.sequelize.sync({alter: true}).then(() => {
    console.log('Resync Db');
    // initial();
});

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}