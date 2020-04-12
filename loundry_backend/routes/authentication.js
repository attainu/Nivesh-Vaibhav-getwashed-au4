const jwt = require('jsonwebtoken');
const confige = require('../confige');

const authenticate =(req,res,next) =>{
       const baerer = req.headers.authorization;    
       if(baerer){
         jwt.verify(baerer,confige.secret,(error,data)=>{
           if(error){
             res.status(403).json({status : 'forbidden'});
           }
           else{
             next();
           }
         });
       }
    
  }
  module.exports = authenticate;