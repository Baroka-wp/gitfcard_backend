const db = require("../models");
Category = db.category;

exports.create = (req, res) => {
    Category.create(req.body).then((category) => {
        res.status(201).send(category);
    }).catch((err) => {
        res.status(500).send(err.message);
    })

}

exports.getAll = (req, res) => {
    Category.findAll().then((categories) => {
        res.status(200).send(categories);
    });
}

exports.getOne = (req, res) => {
    const id = req.params.id;
    Category.findByPk(id).then((category) => {
        return res.status(200).send(category);
    }).catch(() => {
        return res.status(404).send({message: 'Category not found!'});
    })
}

exports.update = (req, res) => {
    Category.findOne({
        id: req.params.id
    }).then((product) => {
        product.update(req.body).then((category) => {
            return res.status(201).send(category);
        }).catch((err) => {
            return res.status(500).send(err.message);
        })
    }).catch(()=>{
        return res.status(404).send({ message: "Category Not found." });
    })
}

exports.delete = (req, res) => {
    Category.findOne({
        id: req.params.id
    }).then((product) => {
        product.destroy()
        return res.status(201).send({ message: "Category Deleted Successfully." });
    }).catch((err) => {
        return res.status(404).send({ message: "Category Not found." });
    })
}