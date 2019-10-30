built in middleware in included in express
- such as express.json, it is built in, but we need to invoke
server.use(express.json())

third party middleware
need to install

Helmet 
https://www.npmjs.com/package/helmet
- set security by default

custom middleware
- something I built

global middleware
every request from server or router will
be passed through that middleware


to add functionality to many endpoints 
can use middleware