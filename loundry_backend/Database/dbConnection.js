const Sequelize = require('sequelize');
const dbConnection = new Sequelize('postgres://postgres:vaibhav@123@localhost:5432/loundry');

dbConnection
    .authenticate()
        .then((res)=>{
            console.log(' Db Connection is created');
        })
        .catch(()=>{ 
            console.log(' Db Connection is not created');
        })

module.exports = dbConnection;