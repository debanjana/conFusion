const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
// /promos all
.all((req,res,next)=>{
    res.status = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

// promos get
.get((req, res, next) =>{
    res.end('Will send all the promos to you');
})

// promos post
.post( (req, res, next) => {
    res.end('Will add the promo: ' + req.body.name + ' with details: ' + req.body.description);
   })

// promos put
.put((req, res, next) =>{
    res.statusCode = 403;
    res.end('PUT operation not supported');
})

// promos deleting 
.delete((req, res, next) =>{
    res.end('deleting all promos');
});

// new route for /promos/:promoID

promoRouter.route('/:promoID')
.all((req,res,next)=>{
    res.status = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

// promos get
.get((req, res, next) =>{
    res.end('Will send ' + req.params.promoID + ' the promos to you');
})

// promos/:promoID post
.post((req, res, next) =>{
    res.statusCode = 403;
    res.end('POST operation not supported');
})

// promos put
.put((req, res, next) =>{
    res.write('Updating promo : '+  req.params.promoID + '\n');
    res.end('Updating promo '+ req.body.name  + ' with details '+ req.body.description);
})

// promos deleting 
.delete((req, res, next) =>{
    res.end('deleting promo ' + req.params.promoID);
});


module.exports = promoRouter;