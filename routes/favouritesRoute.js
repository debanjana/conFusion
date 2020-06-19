const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// model
const Dishes = require('../models/dishes');
const Users = require('../models/user');
const Favourites = require('../models/favourite');


// uisng JWT token to authenticate and verify
var authenticate = require('../authenticate');
const cors = require('./cors');
const favouritesRouter = express.Router();
favouritesRouter.use(bodyParser.json());


favouritesRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Favourites.find({}) // model.find
            .populate('user')
            .populate('dishes')
            .then((favourites) => { // dishes is returned from the DB
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favourites);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favourites.findOne({ user: req.user._id }) // model.create
            .then((favourite) => {
                if (favourite) {
                    for (var i = 0; i < req.body.length; i++) {
                        if (favourite.dishes.indexOf(req.body[i] === -1)) {
                            favourite.dishes.push(req.body[i]._id);
                        }
                    }
                    favourite.save()
                        .then((favourite) => {
                            Favourites.find(favourite._id)
                                .populate('user')
                                .populate('dishes')
                                .then((favourites) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(favourites);
                                })
                        })
                }
                else {
                    Favourites.create({ "user": req.user._id, "dishes": req.body })
                        .then((favourite) => {
                            console.log('Favourite created: ', favourite);
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favourites);
                        });

                }
            });
    })
    .put(cors.corsWithOptions, authenticate.verifyUser,  (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /favourited dishes');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser,  (req, res, next) => {
        Favourites.findOneAndRemove({ "user": req.user._id })
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });




favouritesRouter.route('/:dishId')

    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favourites.findOne({ user: req.user._id })
            .then((favourite) => {
                if (favourite) {
                    // req.body.author = req.user._id
                    if (favourite.dishes.indexOf(req.params.dishId) === -1) {
                        favourite.dishes.push(req.params.dishId);
                        favourite.save()
                            .then((favourite) => {
                                Favourites.findById(favourite._id)
                                    .populate('user')
                                    .populate('dishes')
                                    .then((favourite) => {
                                        res.statusCode = 200;
                                        res.setHeader('Content-Type', 'application/json');
                                        res.json(favourite);
                                    })

                            }, (err) => next(err));
                    }
                    else {
                        err = new Error('Dis alread added');
                        err.statusCode = 403;
                        return next(err);
                    }
                }
                else {
                    favourite.create({ user: req.user._id, dishes: [req.params.dishId] })
                        .then((favourite) => {
                            Favourites.findById(favourite._id)
                                .populate('user')
                                .populate('dishes')
                                .then((favourite) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(favourite);
                                })

                        })

                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favourites.findOne({ user: req.user._id })
            .then((favourite) => {
                if (favourite != null) {

                    if (favourite.dishId.indexOf(req.params.dishId) != -1) {
                        favourite.dishes.splice(index, 1);
                        favourite.save()
                            .then((favourite) => {
                                Favourites.findById(favourite._id)
                                    .populate('user')
                                    .populate('dishes')
                                    .then((favourite) => {
                                        res.statusCode = 200;
                                        res.setHeader('Content-Type', 'application/json');
                                        res.json(favourite);
                                    })
                            }, (err) => next(err));
                    }
                    else {
                        err = new Error('dish not found');
                        err.status = 404;
                        return next(err);
                    }
                }
                else if (dish == null) {
                    err = new Error('Dish ' + req.params.dishId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });


module.exports = favouritesRouter;