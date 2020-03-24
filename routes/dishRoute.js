const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// model
const Dishes = require('../models/dishes');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());


dishRouter.route('/')
.get((req,res,next) => {
    Dishes.find({}) // model.find
    .then((dishes) => { // dishes is returned from the DB
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Dishes.create(req.body) // model.create
    .then((dish) => {
        console.log('Dish Created ', dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req, res, next) => {
    Dishes.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

dishRouter.route('/:dishId')
.get((req,res,next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId);
})
.put((req, res, next) => {
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, { new: true })
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


// // new route for /dishes/:dishID

// dishRouter.route('/:dishID')
// .all((req,res,next)=>{
//     res.status = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();
// })

// // dishes get
// .get((req, res, next) =>{
//     res.end('Will send ' + req.params.dishID + ' the dishes to you');
// })

// // dishes/:dishID post
// .post((req, res, next) =>{
//     res.statusCode = 403;
//     res.end('POST operation not supported');
// })

// // dishes put
// .put((req, res, next) =>{
//     res.write('Updating dish : '+  req.params.dishID + '\n');
//     res.end('Updating dish '+ req.body.name  + ' with details '+ req.body.description);
// })

// // dishes deleting 
// .delete((req, res, next) =>{
//     res.end('deleting dish ' + req.params.dishID);
// });


module.exports = dishRouter;