var express = require('express');
var router = express.Router();

const Iron = require('../model/iron.model');
/* GET users listing. */

router.post('/add', async(req, res, next) => {
  try {
      let {...body } = req.body;
      console.log(body);
      let iron = await Iron.create(body);
      res.json({ iron });
  } catch (error) {
    console.log(error)
  }
});

router.get('/read',async (req,res,next)=>{
  try {
      let {...params }= req.params;
        let iron = await Iron.findAll();
        res.json(iron);
  } catch (error) {
    console.log(error);
  }
})

router.put('/update/:id',async (req,res,next)=>{
  try {
      let {...params }= req.params;
        let iron = await Iron.update(body,{where: params});
        res.json(iron);
  } catch (error) {
    console.log(error);
  }
});

router.delete('/delete/:id', async(req,res,next)=>{
    try {
       
      let {...params }= req.params;
        let iron = await Iron.destroy({where: params});
        res.json(iron);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
