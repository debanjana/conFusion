const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// model
const Promos = require('../models/promotions');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());


promoRouter.route('/')
.get((req,res,next) => {
    Promos.find({}) // model.find
    .then((Promos) => { // Promos is returned from the DB
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Promos);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Promos.create(req.body) // model.create
    .then((promo) => {
        console.log('promo Created ', promo);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Promos');
})
.delete((req, res, next) => {
    Promos.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

promoRouter.route('/:promoId')
.get((req,res,next) => {
    Promos.findById(req.params.promoId)
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /Promos/'+ req.params.promoId);
})
.put((req, res, next) => {
    Promos.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, { new: true })
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Promos.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


// promoRouter.route('/')
// // /promos all
// .all((req,res,next)=>{
//     res.status = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();
// })

// // promos get
// .get((req, res, next) =>{
//     res.end('Will send all the promos to you');
// })

// // promos post
// .post( (req, res, next) => {
//     res.end('Will add the promo: ' + req.body.name + ' with details: ' + req.body.description);
//    })

// // promos put
// .put((req, res, next) =>{
//     res.statusCode = 403;
//     res.end('PUT operation not supported');
// })

// // promos deleting 
// .delete((req, res, next) =>{
//     res.end('deleting all promos');
// });

// // new route for /promos/:promoID

// promoRouter.route('/:promoID')
// .all((req,res,next)=>{
//     res.status = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();
// })

// // promos get
// .get((req, res, next) =>{
//     res.end('Will send ' + req.params.promoID + ' the promos to you');
// })

// // promos/:promoID post
// .post((req, res, next) =>{
//     res.statusCode = 403;
//     res.end('POST operation not supported');
// })

// // promos put
// .put((req, res, next) =>{
//     res.write('Updating promo : '+  req.params.promoID + '\n');
//     res.end('Updating promo '+ req.body.name  + ' with details '+ req.body.description);
// })

// // promos deleting 
// .delete((req, res, next) =>{
//     res.end('deleting promo ' + req.params.promoID);
// });


module.exports = promoRouter;