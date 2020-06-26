const dotenv  = require('dotenv');
dotenv.config();
const Sequelize = require('sequelize');
 let dbConnection = null;
if(process.env.NODE_ENV === 'production'){
      dbConnection = new Sequelize(process.env.DATABASE_URL);
}
else{
     dbConnection = new Sequelize(process.env.CONNECTIONURL);
}
 

dbConnection
    .authenticate()
        .then((res)=>{
            console.log(' Db Connection is created');
        })
        .catch(()=>{ 
            console.log(' Db Connection is not created');
        })

module.exports = dbConnection;