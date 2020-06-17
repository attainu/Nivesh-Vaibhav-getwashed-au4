const jwt = require('jsonwebtoken');
const confige = require('../confige.js');
console.log(confige);
const authenticate =(req,res,next) =>{
//'Authorization': `Bearer ${token}`
      var token = req.headers['x-access-token'];
        
       if(token){   
        jwt.verify(token,confige.secret,(error,data)=>{
           if(error)
           {      
                   
             res.status(403).json({status : 'forbidden'});
           }
           else
           {           
             next();
           }
         });
       }
       else{
          res.status(403).json({status : 'Token Not Received'});
         console.log('Token Not Received');
       }
    
  }
  module.exports = authenticate;