const db = require("../models");
const err = require("jsonwebtoken/lib/JsonWebTokenError");
const {unlinkSync} = require("node:fs");
Product = db.product;

exports.create = (req, res) => {
    console.log('Fichier reçu :', req.file); // Vérifie si le fichier est reçu
    console.log('Corps de la requête :', req.body); // Vérifie les données textuelles

    if (!req.file) {
        return res.status(400).json({ error: 'Image file is required' });
    }

    const { name, description, price, stock, categoryId } = req.body;

    if (!name || !description || !price || !stock || !categoryId) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const imagePath = `/uploads/products/${req.file.filename}`;
    Product.create(
        {
            name,
            description,
            price,
            stock,
            image: imagePath,
            categoryId
        }
    ).then((product) => {
        res.status(201).send(product);
    }).catch((err) => {
        res.status(500).send(err.message);
    })

}

exports.getAll = (req, res) => {
    Product.findAll().then((products) => {
        for (let i=0; i<products.length; i++) {
            products[i].imageUrl = `${req.protocol}://${req.get('host')}/${products[i].image}`;
        }
        return res.status(200).send(products);
    });
}

exports.getOne = (req, res) => {

    const { id } = req.params;
    Product.findByPk(id).then((product) => {
        product.imageUrl = `${req.protocol}://${req.get('host')}/${product.image}`;
        return res.status(200).send(product);
    }).catch((err) => {
        return res.status(500).send({message: err.message});
    })
}

exports.update = (req, res) => {
   Product.findOne({
        id: req.params.id
    }).then((product) => {
        product.update(req.body).then((product) => {
            return res.status(201).send(product);
        }).catch((err) => {
            return res.status(500).send(err.message);
        })
    }).catch(()=>{
        return res.status(404).send({ message: "Product Not found." });
    })
}

exports.delete = (req, res) => {
    Product.findOne({
        id: req.params.id
    }).then((product) => {
        unlinkSync(product.image);
        product.destroy()
        return res.status(201).send({ message: "Product Deleted Successfully." });
    }).catch((err) => {
        return res.status(404).send({ message: "Product Not found." });
    })
}