const Sequelize = require ('sequelize');
const  order = require ('./order.model');
const dbConnecction = require('../Database/dbConnection');

const cloth = dbConnecction.define('cloth',{
    
    cloth_name : {
        type: Sequelize.STRING,
        allowNull : false
    },
    price :{
        type: Sequelize.INTEGER,
        allowNull : false
    },
    cloth_quantity :{
        type: Sequelize.INTEGER,
        allowNull : false
    },
    total:{
        type : Sequelize.INTEGER,
        allowNull : false
    },
    action:{
        type : Sequelize.STRING,
        allowNull : false
    }
},{ timestamps : false});

order.hasMany(cloth,{ foreignKey : "order_orderId",targetKey:'id'});
cloth.belongsTo(order,{ foreignKey : "order_orderId",targetKey:"id"},)

cloth.sync()
    .then((res)=>{ console.log('Cloth Table is Created')})
    .catch((res)=>{ console.log('Cloth Table Is Not Created')});

module.exports = cloth;    