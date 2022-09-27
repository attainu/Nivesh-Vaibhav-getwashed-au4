const dbConnection = require("../Database/dbConnection");
const Sequelize = require("sequelize");

const Cloth = require("./cloth.model");

const dryClean = dbConnection.define(
  "dryClean",
  {
    cloth_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    cloth_quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    image: {
      type: Sequelize.BLOB,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

//dryclean.belongsTo(Cloth,{ foreignKey : "cloth_id",type:Sequelize.INTEGER,targetKey:"id"},);
dryClean
  .sync()
  .then((res) => {
    console.log("DryClean Table Is Created");
  })
  .catch((res) => {
    console.log("DryClean Table Is Not Created");
  });

module.exports = dryClean;
