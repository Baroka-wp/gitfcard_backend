const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    const Product =  sequelize.define('Product', {
        name : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price : {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        stock : {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        image : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    })
    Product.associate = (models) => {
        Product.belongsTo(models.Category, {
            foreignKey: 'categoryId',
            as: 'category', // Alias pour la relation
        });
    };
    return Product;
};