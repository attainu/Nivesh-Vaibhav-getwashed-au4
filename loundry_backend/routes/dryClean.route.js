var express = require('express');
var router = express.Router();

const DryClean = require('../model/dryClean.model');
/* GET users listing. */

router.post('/add', async(req, res, next) => {
  try {
      let {...body } = req.body;
      console.log(body);
      let dryClean = await DryClean.create(body);
      res.json({ dryClean });
  } catch (error) {
    console.log(error)
  }
});

router.get('/read',async (req,res,next)=>{
  try {
      let {...params }= req.params;
        let dryClean = await DryClean.findAll();
        res.json(dryClean);
  } catch (error) {
    console.log(error);
  }
})

router.put('/update/:id',async (req,res,next)=>{
  try {
      let {...params }= req.params;
        let dryClean = await DryClean.update(body,{where: params});
        res.json(dryClean);
  } catch (error) {
    console.log(error);
  }
});

router.delete('/delete/:id', async(req,res,next)=>{
    try {
       
      let {...params }= req.params;
        let dryClean = await DryClean.destroy({where: params});
        res.json(dryClean);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
