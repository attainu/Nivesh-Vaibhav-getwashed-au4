const express = require('express');
let router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const admin = require('../model/admin.model');

router.post('/signin',async(req,res,next)=>{
   try {
        let  {...body} = req.body;
        let user = await admin.findOne(body);
        if(user){
            if(admin.validatePassword(body.password,user)){
                let token = jwt.sign({user : user.id},process.env.secret,{expiresIn : 900});
                user.token = token;
                let {password,...newUser} = user.dataValues;
                res.status(200).json(newUser);
            }
        }
        else{
            res.status(400).json({'message': 'Unathorised User'});
        }

   } catch (error) {
       console.log(error);
   }
})

module.exports = router;