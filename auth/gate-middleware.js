 

// f() check for password
module.exports = function gate(req, res, next){
    const password = req.headers.password
  
    if(password && password === 'mellon'){
      next()
    } else {
      res.status(401).json({you: 'Shall not pass'})
    }
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