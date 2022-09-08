const dotenv = require("dotenv");
dotenv.config();
const Sequelize = require("sequelize");
let dbConnection = null;
try {
  if (process.env.NODE_ENV === "production") {
    dbConnection = new Sequelize(process.env.DATABASE_URL);
  } else {
    dbConnection = new Sequelize(process.env.CONNECTIONURL);
    //console.log(dbConnection);
  }

 dbConnection
 .authenticate()
 .then(function(err) {
  console.log('DB connection has been established successfully.');
 }, function (err) {
  console.log('Unable to connect to the database:', err);
 });

 
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = dbConnection;
