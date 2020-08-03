var express = require('express');
var router = express.Router();

const Action = require('../model/action.model');
/* GET users listing. */

router.post('/add', async(req, res, next) =>{
  try {
      let {...body } = req.body;
      let action = await Action.create(body);
      res.json(action);
  } catch (error) {
    console.log(error)
  }
});

router.get('/read',async (req,res,next)=>{
  try {
      let {...params }= req.params;
        let action = await Action.findAll();
        res.json(action);
  } catch (error) {
    console.log(error);
  }
})

router.put('/update/:id',async (req,res,next)=>{
  try {
      let {...params }= req.params;
        let action = await Action.update(body,{where: params});
        res.json(action);
  } catch (error) {
    console.log(error);
  }
});

router.delete('/delete/:id', async(req,res,next)=>{
    try {
       
      let {...params }= req.params;
        let action = await Action.destroy({where: params});
        res.json(action);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
