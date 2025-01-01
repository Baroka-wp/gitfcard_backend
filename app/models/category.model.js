const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    const Category = sequelize.define('Category', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Category.associate = (models) => {
        Category.hasMany(models.Product, {
            foreignKey: 'categoryId',
            as: 'products', // Alias pour la relation
        });
    };

    return Category;
};