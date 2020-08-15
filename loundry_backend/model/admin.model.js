const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const dbConnection =  require('../Database/dbConnection');

const admin = dbConnection.define('admin',{
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
    }
},{
    timestamps: false
});


admin.encryptPassword = password =>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
};

admin.validatePassword = (password,admin) => {
    console.log('inside valid password');
    return bcrypt.compareSync(password,admin.password);
};

admin.sync()
    .then((res)=>{ console.log('Table admin Is Created')})
    .catch(()=>{ console.log('Table admin Is not Created')})

module.exports = admin;