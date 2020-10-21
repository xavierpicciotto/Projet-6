const Sauces = require('../models/Sauces');
const {
    db
} = require('../models/Sauces');

exports.createSauce = (req, res, next) => {
    const saucesObject = JSON.parse(req.body.sauce);
    console.log(saucesObject);
    const sauceNew = new Sauces({
        ...saucesObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauceNew.save()
        .then(() => res.status(201).json({
            message: 'Objet enregistré !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
};

exports.findAllSauces = (req, res, next) => {
    Sauces.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({
            error
        }));
};

exports.findOneSauce = (req, res, next) => {
    Sauces.findOne({
        _id: req.params.id
    }).then(
        (sauce) => {
            res.status(200).json(sauce);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.updateSauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...req.body
    };
    Sauces.updateOne({
            _id: req.params.id
        }, {
            ...sauceObject,
            _id: req.params.id
        })
        .then(() => res.status(200).json({
            message: 'Objet modifié !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
};

exports.deleteSauce = (req, res, next) => {

    Sauces.deleteOne({
        _id: req.params.id
    }).then(
        () => {
            res.status(200).json({
                message: 'Deleted!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

const voted = require('./like_modules/voted');

exports.ratingSauce = (req, res, next) => {
    const user = req.body.userId;
    const voteValue = req.body.like;
    console.log(req.body);
    Sauces.findOne({
        _id: req.params.id
    }).then(
        (sauce) => {
            const rating = voted(sauce, voteValue, user);
            console.log(JSON.stringify(rating) + " . . . check object update");
            Sauces.updateOne({
                    _id: req.params.id
                }, {
                    ...rating,
                    _id: req.params.id
                })
                .then(() => res.status(200).json({
                    message: 'Objet liked !'
                })).catch(
                    (error) => {
                        res.status(400).json({
                            error: error
                        });
                    }
                );;
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};