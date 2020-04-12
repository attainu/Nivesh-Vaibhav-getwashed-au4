var express = require('express');
var router = express.Router();
const confige = require('../confige.json');
const jwt = require('jsonwebtoken');
const  User = require('../model/user.model');
const authenticate = require('./authentication');

/* GET home page. */
// Pass authenticate as middleware for check jwt token.
 

 router.post('/try',authenticate,(req,res,next)=>{
   
   res.json({ status : 'valid user' });
 })

router.post('/signup',async(req, res, next)=> {
  try {
    let { ...body } = req.body;

    body.password = User.encryptPassword(body.password)
    let user = await User.findOne({ where:{ email : body.email }});
    console.log(user);
      if(user === null){
        let user = await User.create(body);
          res.json({
            user
          });  
      }
      else{
        res.json({ status :'User All Ready signUp with Email' });
                }

  } catch (error) {
    console.log(error)
  }
});

router.put('/update/:id',async(req,res,next)=>{
  try {
    let {...body } = req.body;
    let {...params } = req.params;
    let user = await User.update({user_orderId : body.id},{ where : params});
    res.json({ user });
  } catch (error) {
    console.log(error)
  }
})

router.get('/read/:id',authenticate,async (req,res,next)=>{
  try {
    let { ...params } = req.params;
      console.log(params);
    let user = await User.findOne({ where : params})
    res.json(user);
  } catch (error) {
    console.log(error);
  }
})

router.post('/signin',async(req,res,next)=>{
  try {
    let { ...body} = req.body;
    
 
    let user = await User.findOne({ where : { email : body.email }});
    if(user){
      if(User.validatePassword(body.password,user))
        {
          const token = jwt.sign({ user : user.id },confige.secret,{  expiresIn: '30' });
        let { password, ...newUser} = user.dataValues;
         newUser.token = token;
          res.status(200).json(newUser);
        }
      }
    else{
      res.json({ status : 'Unauthorise user'});
    }
  } catch (error) {
    console.log(error);
  }

})
module.exports = router;