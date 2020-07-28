const jwt = require('jsonwebtoken');
require('dotenv').config();
const authenticate =(req,res,next) =>{
//'Authorization': `Bearer ${token}`
      var token = req.headers['x-access-token'];
        console.log(token);
       if(token){   
        jwt.verify(token,process.env.SECRET,(error,data)=>{
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
          res.status(403).json({isLoggedIn : 'false'});
        
       }
    
  }
  module.exports = authenticate;