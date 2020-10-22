const Sauces = require('../models/Sauces');
const {
    db
} = require('../models/Sauces');

//Pour la création d'une sauce.
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

//Récupère toutes les sauces.
exports.findAllSauces = (req, res, next) => {
    Sauces.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({
            error
        }));
};

//Récupère une seule sauce.
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

//Permet de modifier une sauce enregistrée, image / information.
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

//Suprime une sauce.
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

//Importe la fonction des likes et dislikes.
const voted = require('./like_modules/voted');

//Permet de Liker ou disliker une sauce ou bien de retirer son choix.
exports.ratingSauce = (req, res, next) => {
    const user = req.body.userId;
    const voteValue = req.body.like;
    console.log(req.body);
    //On récupère l'objet de la sauce.
    Sauces.findOne({
        _id: req.params.id
    }).then(
        (sauce) => {
            //On utilisa la fonction importée pour renvoyer les modification a apporter.
            const rating = voted(sauce, voteValue, user);
            console.log(JSON.stringify(rating) + " . . . check object update");

            //On modifie la sauce avec les nouvelles informations.
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