const express = require('express'); // importing a CommonJS module

//middleware, npm i helmet
const helmet = require('helmet')
const hubsRouter = require('./hubs/hubs-router.js');
//npm i morgan 1:14
const morgan = require('morgan')

const server = express();

const gate = require('./auth/gate-middleware')


//middleware
// when call next(), it will move req to next middleware
function logger(req, res, next){
  console.log(`${req.method} to ${req.path}`)

  next()
}

//in class
function urlMethod(req, res, next){
  console.log(`${req.path}, ${req.method}`)
}

// change the gatekeeper to return a 400 if no password is provided and a message
// that says please provide a password
// if a password is provided and it is mellon, call next, otherwise return a 401
// and the you shall not pass message
function gateKeeper(req, res, next) {
  // data can come in the body, url parameters, query string, headers
  // new way of reading data sent by the client
  const password = req.headers.password || '';

  if(!req.headers.password){
    res.status(400).json({message: 'no password provided'})
  } else { next ()}

  if (password.toLowerCase() === 'mellon') {
    next();
  } else {
    res.status(400).json({ you: 'you shall not pass!!' });
  }
}

// function gateKeeper(req, res, next){
//   //data can come in body, url params, query string, header
//   //new way of reading data sent to client

// }
//put values in header, body is only available to post and put


server.use(logger)
// order matters, middleware is running before express.json and routes
server.use(helmet())
server.use(express.json());
server.use(morgan('dev'))

//created to be used everywhere
server.use(urlMethod)



server.get('/free', (req, res) => {
  res.status(200).json({welcome: 'web developers'})
})

server.get('/paid', gate, (req, res) => {
  res.status(401).json({welcome: 'you are in'})
})

server.use('/api/hubs', hubsRouter);

//function to add a name to header
//added req.teamName
function addName(req, res, next){
  const name = 'Web Deeve'

  req.teamName = name

  next() //so now it can go to next middleware

}

server.get('/', addName, (req, res) => {
  const nameInsert = (req.teamName) ? ` ${req.teamName}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
