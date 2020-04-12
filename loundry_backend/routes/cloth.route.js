var express = require('express');
var router = express.Router();

const Cloth = require('../model/cloth.model');
/* GET users listing. */

router.post('/add', async(req, res, next) => {
  try {
      let {...body } = req.body;
      console.log(body);
      let cloth = await Cloth.create(body);
      res.json({ cloth });
  } catch (error) {
    console.log(error)
  }
});

router.get('/read',async (req,res,next)=>{
  try {
      let {...params }= req.params;
        let cloth = await Cloth.findAll();
        res.json(cloth);
  } catch (error) {
    console.log(error);
  }
})

router.put('/update/:id',async (req,res,next)=>{
  try {
      let {...params }= req.params;
        let cloth = await Cloth.update(body,{where: params});
        res.json(cloth);
  } catch (error) {
    console.log(error);
  }
});

router.delete('/delete/:id', async(req,res,next)=>{
    try {
       
      let {...params }= req.params;
        let cloth = await Cloth.destroy({where: params});
        res.json(cloth);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
