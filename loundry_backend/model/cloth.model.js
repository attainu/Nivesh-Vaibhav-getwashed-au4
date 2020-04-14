const Sequelize = require ('sequelize');
const dbConnecction = require('../Database/dbConnection');

const cloth = dbConnecction.define('cloth',{
    cloth_name : {
        type: Sequelize.STRING,
        allowNull : false
    },
    cloth_quantity :{
        type: Sequelize.INTEGER,
        allowNull : false
    }
},{ timestamps : false});


cloth.sync()
    .then((res)=>{ console.log('Cloth Table is Created')})
    .catch((res)=>{ console.log('Cloth Table Is Not Created')});

module.exports = cloth;    