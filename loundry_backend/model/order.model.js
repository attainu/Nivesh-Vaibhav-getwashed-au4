const dbConnection = require('../Database/dbConnection');
const Sequelize = require('sequelize');

const User = require('./user.model');
const Cloth = require('./cloth.model')
console.log(User,Cloth);
const order = dbConnection.define('order',{
        order_date :{
            type: Sequelize.DATE,
            allowNull :  false
        }, 
        order_time :{
            type: Sequelize.TIME,
            allowNull :  false
        }, 
        order_typeofwash :{
            type: Sequelize.ENUM,
            values: ['WASH', 'DRY CLEAN','IRON'],
            allowNull :  false
        },
        order_totalprice :{
            type: Sequelize.INTEGER,
            allowNull : false 
         }, 
        order_paymentmode :{
            type: Sequelize.ENUM,
            values: ['CASH', 'CARD','UPI'],
            allowNull : false 
        },
        order_status : {
            type :Sequelize.ENUM,
            values: ['Picked', 'InProgress','Complite','Deliverd']
        },
      
  },{
    timestamps: false
  }
);

order.belongsTo(User,{ foreignKey : "order_userId",type:Sequelize.INTEGER,targetKey:"id"},);
order.belongsTo(Cloth,{ foreignKey : "order_clothId",type:Sequelize.ARRAY(Sequelize.INTEGER),targerKey :"id"});

order.sync().then((res)=>{
    console.log('order table is created');
})
.catch((err)=>{ 
    console.log('order table is not created')
})

module.exports = order;