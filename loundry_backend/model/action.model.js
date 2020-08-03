const Sequelize = require ('sequelize');
const dbConnecction = require('../Database/dbConnection');

const action = dbConnecction.define('action',{
    action_type : {
        type: Sequelize.STRING,
        allowNull : false
    },
    
},{ timestamps : false});


action.sync()
    .then((res)=>{ console.log('action Table is Created')})
    .catch((res)=>{ console.log('action Table Is Not Created')});

module.exports = action;    