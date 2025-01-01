const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const WishList = sequelize.define('wishlist', {
        name: {type: DataTypes.STRING, allowNull: false},
        occasion: {type: DataTypes.STRING, allowNull: false},
        total: {type: DataTypes.FLOAT, allowNull: false, defaultValue: 0},
        client: {type: DataTypes.STRING, allowNull: false},
        shippingAddress: {type: DataTypes.STRING, allowNull: false},
        telephone: {type: DataTypes.INTEGER, allowNull: false},
    })
    WishList.associate = (models) => {
        WishList.hasMany(models.Wish, {
            foreignKey: 'wishListId', // Clé étrangère dans la table Wish
            as: 'wishes', // Alias pour la relation
        });
    };

    return WishList;
}
