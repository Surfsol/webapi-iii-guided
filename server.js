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



// function gateKeeper(req, res, next){
//   //data can come in body, url params, query string, header
//   //new way of reading data sent to client

// }
//put values in header, body is only available to post and put


//add something to car/ req
function doubler(req, res, next){
  //everything from url is a string
  const number = Number(req.query.number || 0)

  req.doubled = number * 2

  next()

}

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

server.use(doubler)

//function to add a name to header
//added req.teamName
function addName(req, res, next){
  const name = 'Web Deeve'

  req.teamName = name

  next() //so now it can go to next middleware

}
//in insomina url?number=3
server.get('/', doubler, addname, (req, res) => {
  const nameInsert = (req.teamName) ? ` ${req.teamName}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
