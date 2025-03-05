const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    if (!req.body.tytul) {
        res.status(400).send({
            message: "Zawartość nie może być pusta!"
        });
        return;
    }

    const tutorial = {
        tytul: req.body.tytul,
        opis: req.body.opis,
        opublikowany: req.body.opublikowany ? req.body.opublikowany : false
    };

    Tutorial.create(tutorial)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.meassage || "Podczas zapisywania wystąpił błąd."
            });
        });
};

exports.findAll = (req, res) => {
    const title = req.query.tytul;
    var condition = title ? { tytul: { [Op.like]: `%${title}` } } : null;

    Tutorial.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Podczas odczytywania wystąpił błąd."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Nie ma Tutorialu o id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Błąd szukania tutorialu o id=" +id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial został zmieniony."
                });
            } else {
                res.send({
                    message: `Nie mogę zmienić Tutorialu o id=${id}. Być może nie ma takiego Tutorialu lub req.body jest puste!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Błąd zmiany Tutorialu o id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial został usunięty!"
                });
            } else {
                res.send({
                    message:`Nie mogę usunąć Tutorialu o id=${id}. Może nie ma takiego Tutorialu!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Nie mogę usunąć Tutorialu o id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `Tutorials ${nums} zostały usunięte!`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Podczas usuwania wystąpiły błędy."
            });
        });
};

exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where: { opublikowany: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Podczas znajdowania Tutoriali wystąpiły błędy."
            });
        });
};