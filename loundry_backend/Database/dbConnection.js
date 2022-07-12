const dotenv = require("dotenv");
dotenv.config();
const Sequelize = require("sequelize");
let dbConnection = null;
if (process.env.NODE_ENV === "production") {
  dbConnection = new Sequelize(process.env.DATABASE_URL);
} else {
  dbConnection = new Sequelize(process.env.CONNECTIONURL);
}
try {
  dbConnection.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = dbConnection;
