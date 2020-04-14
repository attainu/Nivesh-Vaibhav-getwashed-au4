var express = require('express');
var router = express.Router();

const Wash = require('../model/wash.model');
/* GET users listing. */

router.post('/add', async(req, res, next) => {
  try {
      let {...body } = req.body;
      console.log(body);
      let wash = await Wash.create(body);
      res.json({ wash });
  } catch (error) {
    console.log(error)
  }
});

router.get('/read',async (req,res,next)=>{
  try {
      let {...params }= req.params;
        let wash = await Wash.findAll();
        res.json(wash);
  } catch (error) {
    console.log(error);
  }
})

router.put('/update/:id',async (req,res,next)=>{
  try {
      let {...params }= req.params;
        let wash = await Wash.update(body,{where: params});
        res.json(wash);
  } catch (error) {
    console.log(error);
  }
});

router.delete('/delete/:id', async(req,res,next)=>{
    try {
       
      let {...params }= req.params;
        let wash = await Wash.destroy({where: params});
        res.json(wash);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
