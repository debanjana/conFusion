const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
// /dishes all
.all((req,res,next)=>{
    res.status = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

// dishes get
.get((req, res, next) =>{
    res.end('Will send all the dishes to you');
})

// dishes post
.post( (req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
   })

// dishes put
.put((req, res, next) =>{
    res.statusCode = 403;
    res.end('PUT operation not supported');
})

// dishes deleting 
.delete((req, res, next) =>{
    res.end('deleting all dishes');
});

// new route for /dishes/:dishID

dishRouter.route('/:dishID')
.all((req,res,next)=>{
    res.status = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

// dishes get
.get((req, res, next) =>{
    res.end('Will send ' + req.params.dishID + ' the dishes to you');
})

// dishes/:dishID post
.post((req, res, next) =>{
    res.statusCode = 403;
    res.end('POST operation not supported');
})

// dishes put
.put((req, res, next) =>{
    res.write('Updating dish : '+  req.params.dishID + '\n');
    res.end('Updating dish '+ req.body.name  + ' with details '+ req.body.description);
})

// dishes deleting 
.delete((req, res, next) =>{
    res.end('deleting dish ' + req.params.dishID);
});


module.exports = dishRouter;