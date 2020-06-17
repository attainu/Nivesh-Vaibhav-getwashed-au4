const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const dbConnection =  require('../Database/dbConnection');
const Order = require('./order.model');

const user = dbConnection.define('user',{
    fullName :{
        type: Sequelize.STRING,
        allowNull : false
    },
    email : {
        type : Sequelize.STRING,
        allowNull : false
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false
    },
    mobile:{
        type : Sequelize.STRING,
        allowNull : false
    },
    city:{
        type:Sequelize.STRING,
        allowNull: false
    },
    address : {
        type : Sequelize.TEXT,
        allowNull : false 
    } 
   
},{
    timestamps: false
});


user.encryptPassword = password =>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
};

user.validatePassword = (password,user) => {
    console.log('inside valid password');
    return bcrypt.compareSync(password,user.password);
};

user.sync()
    .then((res)=>{ console.log('Table User Is Created')})
    .catch(()=>{ console.log('Table user Is not Created')})

module.exports = user;