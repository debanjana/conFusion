const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
// /leaders all
.all((req,res,next)=>{
    res.status = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

// leaders get
.get((req, res, next) =>{
    res.end('Will send all the leaders to you');
})

// leaders post
.post( (req, res, next) => {
    res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
   })

// leaders put
.put((req, res, next) =>{
    res.statusCode = 403;
    res.end('PUT operation not supported');
})

// leaders deleting 
.delete((req, res, next) =>{
    res.end('deleting all leaders');
});

// new route for /leaders/:leaderID

leaderRouter.route('/:leaderID')
.all((req,res,next)=>{
    res.status = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

// leaders get
.get((req, res, next) =>{
    res.end('Will send ' + req.params.leaderID + ' the leaders to you');
})

// leaders/:leaderID post
.post((req, res, next) =>{
    res.statusCode = 403;
    res.end('POST operation not supported');
})

// leaders put
.put((req, res, next) =>{
    res.write('Updating leader : '+  req.params.leaderID + '\n');
    res.end('Updating leader '+ req.body.name  + ' with details '+ req.body.description);
})

// leaders deleting 
.delete((req, res, next) =>{
    res.end('deleting leader ' + req.params.leaderID);
});


module.exports = leaderRouter;