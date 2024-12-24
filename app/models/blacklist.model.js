
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("blacklist", {
        token: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });
};