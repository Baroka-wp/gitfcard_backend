const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    const Wish = sequelize.define('wish', {
        name: {type: DataTypes.STRING, allowNull: false},
        image: {type: DataTypes.STRING, allowNull: false},
        price: {type: DataTypes.FLOAT, allowNull: false},
        quantity: {type: DataTypes.INTEGER, allowNull: false},
        amount: {type: DataTypes.FLOAT, allowNull: false},
        productId: {
            type: DataTypes.INTEGER,
            model: "products",
            allowNull: false,
        },
        wishListId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    })
    Wish.associate = (models) => {
        Wish.belongsTo(models.WishList, {
            foreignKey: 'wishListId',
            as: 'wishList', // Alias pour la relation inverse
        });
    };

    return Wish;
};