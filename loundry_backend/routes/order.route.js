var express = require('express');
var router = express.Router();

const Order = require('../model/order.model');
const User = require('../model/user.model');
const Cloth = require('../model/cloth.model');
const authenticate = require('../routes/authentication');
/* GET users listing. */

router.post('/add', async(req, res, next) => {
  try {
      let {...body } = req.body;
      console.log(body);
      let order = await Order.create(body);
      res.json({ order });
  } catch (error) {
    console.log(error)
  }
});
// Api for Check All order by date
//`http://localhost:8080/read/user/${selected date}`
router.get('/read/order/:date',async (req,res,next)=>{
  try {
      let {...params }= req.params;
      console.log(params);
      let order = await Order.findAll({ where:{order_date : params.date },attributes:['id','order_date','order_time','order_typeofwash','order_totalprice','order_status'],
                                        include: [{model:User,attributes:['fullName','email','mobile','address']},
                                                  {model:Cloth, attributes:["cloth_name"]}]});
      res.json(order);
  } catch (error) {
    console.log(error);
  }
})

// Api for check order by user id 

//`http://localhost:8080/order/read/user/${user id}`
router.get('/read/user/:id',async (req,res,next)=>{
  try {
          let order = await Order.findAll({where:{order_userId : req.params.id },attributes:['id','order_date','order_collection_time','order_totalprice','order_status','order_paymentmode','order_address']});
        if(order)
        {
          let orderData = JSON.parse(JSON.stringify(order))
          for(let value in orderData)
          {
            let item = await Cloth.findAll({where:{order_orderId : orderData[value].id},attributes :['cloth_name','cloth_quantity','price','total','action']});
            let result = JSON.parse(JSON.stringify(item));  
            orderData[value].order_items = result;          
          }
          res.json(orderData);
        }  
  } catch (error) {
    console.log(error);
  }
})
module.exports = router;
