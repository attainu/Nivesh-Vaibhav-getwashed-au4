const dbConnection = require('../Database/dbConnection');
const Sequelize = require('sequelize');

const User = require('./user.model');

const order = dbConnection.define('order',{
        order_date :{
            type: Sequelize.DATE,
            allowNull :  false
        }, 
        order_collection_time :{
            type: Sequelize.STRING,
            allowNull :  false
        }, 
        order_address :{
            type : Sequelize.STRING,
            allowNull :  false
        },
        order_totalprice :{
            type: Sequelize.INTEGER,
            allowNull : false 
         }, 
        order_paymentmode :{
            type: Sequelize.STRING,
            allowNull : false 
        },
        order_status : {
            type :Sequelize.STRING,
           allowNull : false
        }
      
  },{
    timestamps: false
  }
);

User.hasMany(order,{ foreignKey : "order_userId", targetKey:'id'});
order.belongsTo(User,{ foreignKey : "order_userId",targetKey:"id"});

order.sync().then((res)=>{
    console.log('order table is created');
})
.catch((err)=>{ 
    console.log('order table is not created')
})

module.exports = order;