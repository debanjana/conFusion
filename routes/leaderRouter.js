const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// model
const Leaders = require('../models/leaders');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());



leaderRouter.route('/')
.get((req,res,next) => {
    Leaders.find({}) // model.find
    .then((Leaders) => { // Leaders is returned from the DB
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Leaders.create(req.body) // model.create
    .then((leader) => {
        console.log('leader Created ', leader);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Leaders');
})
.delete((req, res, next) => {
    Leaders.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

leaderRouter.route('/:leaderId')
.get((req,res,next) => {
    Leaders.findById(req.params.leaderId)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /Leaders/'+ req.params.leaderId);
})
.put((req, res, next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, { new: true })
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

// leaderRouter.route('/')
// // /leaders all
// .all((req,res,next)=>{
//     res.status = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();
// })

// // leaders get
// .get((req, res, next) =>{
//     res.end('Will send all the leaders to you');
// })

// // leaders post
// .post( (req, res, next) => {
//     res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
//    })

// // leaders put
// .put((req, res, next) =>{
//     res.statusCode = 403;
//     res.end('PUT operation not supported');
// })

// // leaders deleting 
// .delete((req, res, next) =>{
//     res.end('deleting all leaders');
// });

// // new route for /leaders/:leaderID

// leaderRouter.route('/:leaderID')
// .all((req,res,next)=>{
//     res.status = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();
// })

// // leaders get
// .get((req, res, next) =>{
//     res.end('Will send ' + req.params.leaderID + ' the leaders to you');
// })

// // leaders/:leaderID post
// .post((req, res, next) =>{
//     res.statusCode = 403;
//     res.end('POST operation not supported');
// })

// // leaders put
// .put((req, res, next) =>{
//     res.write('Updating leader : '+  req.params.leaderID + '\n');
//     res.end('Updating leader '+ req.body.name  + ' with details '+ req.body.description);
// })

// // leaders deleting 
// .delete((req, res, next) =>{
//     res.end('deleting leader ' + req.params.leaderID);
// });


module.exports = leaderRouter;