const express = require('express'); // importing a CommonJS module

//middleware, npm i helmet
const helmet = require('helmet')
const hubsRouter = require('./hubs/hubs-router.js');

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


server.use(logger)
// order matters, middleware is running before express.json and routes
server.use(helmet())
server.use(express.json());

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
