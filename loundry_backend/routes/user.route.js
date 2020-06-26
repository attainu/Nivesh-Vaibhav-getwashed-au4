var express = require('express');
var router = express.Router();
const nodeMailer = require('nodemailer');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const rateLimit = require("express-rate-limit");

const  User = require('../model/user.model');
const Cloth = require('../model/cloth.model');
const Order = require('../model/order.model');

const authenticate = require('./authentication');
let randomValue = null;

/* GET home page. */
// Pass authenticate as middleware for check jwt token.
let random, mailOption, host, link,userData;

 async function InsertUserInToDb(){
  try {
    
    return;
  } catch (error) {
    console.log(error);
  }
}
 router.get('/try',authenticate,(req,res,next)=>{
   
   res.json({ status : 'valid user' });
 })
 
 const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message:
    "Too many accounts created from this IP, please try again after an hour"
});

router.post('/signup',async(req, res, next)=> {
  try {
    let { ...body } = req.body;
    
    body.password = User.encryptPassword(body.password)
    let user = await User.findOne({ where:{ email : body.email }});
    
      if(user === null){
       userData = body;
        let smtpTransport  = nodeMailer.createTransport({
          host: "smtp.gmail.com",
          auth: {
            user :  'eagle.expressloundry@gmail.com',
            pass : 'expressloundry@123'
          }
        })
        
        random = Math.floor((Math.random()*100)+54);
       
        randomValue = random;
        host = req.get('host');
        link = "http://"+host+"/user/verify?id="+random;
        mailOption = {
          from : "eagle.expressloundry@gmail.com",
          to : body.email,
          subject : "Please Confirm Your Email Account",
          html: "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
        }
          smtpTransport.sendMail(mailOption,(err,data)=>{
            if(err){
              console.log(err);
            }
            else{
             
              alert('Check Your Email For Verification. Click The Link Given Below')
              res.json({
                message :'Check Your Email For Verification. Click The Link Given Below'
              }); 
            }
          })
        
           
      }
      else{
        res.json({ message :'User All Ready signUp with Email' });
      }

  } catch (error) {
    console.log(error)
  }
});

// For Email Verification 

const verifyLimit = rateLimit({
  windowMs : 60 *60 *1000,
  max : 1,
  message : "Not need To verify Email Again, Yur are Verifyed User"
})
router.get('/verify',async(req,res,next)=>{
    try{
      let protocolName = req.protocol;
      let hostName = req.get('host');
      let url = protocolName+'://'+hostName;
      
      if(url === ('http://'+host)){
        if(req.query.id == randomValue)
        {
          let findUser = await User.findOne({ where:{ email : userData.email }});
  
          if(findUser === null)
          {
            let user =  await User.create(userData);
              if(user){
                  res.redirect('http://localhost:3000/signin');
              }
          }
          else{
            res.json({ message : `Your are allready registered User`})
          }
          
        }
        else{
          res.json({ 'message':'Invalid user'})
        }
    }
    else{
      res.json({ 'message':'Invalid Request'})
    }
}
catch(error){
  console.log(error);
}
})

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

router.get('/read/:id',async (req,res,next)=>{
  try {
    let { ...params } = req.params;
     
    let user = await User.findOne({ where : params},{attributes:[],
    include: [{model:Order,where:{order_userId : params},attributes:['id','order_date','order_collection_time','order_totalprice','order_status']},
              {model:Cloth,where :{ id : Order.id}, attributes:["cloth_name",'cloth_quantity','price','total','action']}]}
      )
    res.json(user);
  } catch (error) {
    console.log(error);
  }
})

router.post('/signin',async(req,res,next)=>{
  try {
    let { ...body} = req.body;
    let user = await User.findOne({ where : { email : body.email }});
    if(user)
    {
        if(User.validatePassword(body.password,user))
        {          
          const token = jwt.sign({ user : user.id },process.env.SECRET,{expiresIn: 900});
          let { password, ...newUser} = user.dataValues;
          newUser.token = token;
          res.status(200).json(newUser);
        }
        else{
          res.json({ message : 'Invalid Password'});
        }
      }
    else{
     
      res.json({ message : 'Unauthorised user'});
    }
  } catch (error) {
    console.log(error);
  }

})
module.exports = router;