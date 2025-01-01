const db = require("../models");
Wishlist = db.wishlist;
Wish = db.wish

class WishlistController {

    static async createWishlist(req, res) {
        try {
            Wishlist.create(req.body).then((wishlist) => {
                res.status(201).send(wishlist);
            })
        }
        catch (error) {
            return res.status(500).send(error.message)
        }
    }

    static async getWishlist(req, res) {
        try {
            const { wishlistId } = req.params;
            // Vérifier si la wishlist existe
            const wishlist = await Wishlist.findByPk(wishlistId,
                {
                    include :  [
                        {
                            model: Wish,
                            as: 'wishes', // Alias défini dans la relation
                        },
                    ]
                });

            if (!wishlist) {
                return res.status(404).json({
                    message: "Wishlist not found"
                });
            }

            res.status(200).json({wishlist});

        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    static async addWish(req, res) {
        try {
            const { wishlistId, wishData } = req.body;

            // Vérifier si la wishlist existe
            const wishlist = await Wishlist.findByPk(wishlistId);

            if (!wishlist) {
                return res.status(404).json({
                    message: "Wishlist not found"
                });
            }

            // Ajouter le wish à la wishlist
            const wish = await Wish.create({ ...wishData, wishlistId });
            wishlist.total = wishlist.total + wish.amount;
            wishlist.save();
            res.status(201).json({wish});
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    static async removeWish(req, res) {
        try {
            const { wishlistId, wishId } = req.params;

            // Vérifier si le wish existe
            const wish = await Wish.findOne({
                where: { id: wishId, wishlistId }
            });
            if (!wish) {
                return res.status(404).json({
                    success: false,
                    message: "Wish not found in this wishlist"
                });
            }

            await wish.destroy();

            res.status(200).json({ message: 'Wish Deleted Successfully.' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateWishlist(req, res) {
        try {
            const { wishlistId, total, wishData } = req.body;

            // Vérifier si la wishlist existe
            const wishlist = await Wishlist.findByPk(wishlistId);
            if (!wishlist) {
                return res.status(404).json({
                    message: "Wishlist not found"
                });
            }
            const wish = await Wish.findAll({
                where: { wishListId : wishlistId }
            });
            if (wish.length > 0) {
                for (let i = 0; i < wish.length; i++) {
                    await wish[i].destroy();
                }
            }

            // Ajouter les nouveaux wishes à la wishlist
            for (let i=0; i<wishData.length; i++) {
                await Wish.create({ ...wishData[i] });
            }
            wishlist.total = total;
            wishlist.save();
            await Wishlist.findByPk(wishlistId,
                {
                    include :  [
                        {
                            model: Wish,
                            as: 'wishes', // Alias défini dans la relation
                        },
                    ]
                }).then((wishlist)=> {
                res.status(201).json({wishlist});
            });
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    static async deleteWishlist(req, res) {
        try {
            const { id} = req.params;


            const wishlist = await Wishlist.findByPk(id);
            if (!wishlist) {
                return res.status(404).json({message: "Wishlist not found"});
            }

            const wish = await Wish.findAll({
                where: { wishListId : id }
            });
            if (wish.length === 0) {
                wishlist.destroy()
                res.status(200).json({ message: 'Wishlist Deleted Successfully.' });
            }

            for (let i = 0; i < wish.length; i++) {

                await wish[i].destroy();
            }
            wishlist.destroy()
            res.status(200).json({ message: 'Wishlist Deleted Successfully.' });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = WishlistController;