const dbConnection = require('../Database/dbConnection');
const Sequelize = require('sequelize');

const Cloth = require('./cloth.model')

const iron = dbConnection.define('iron',{
        cloth_name : {
            type: Sequelize.STRING,
            allowNull : false
        },
        price :{
          type: Sequelize.INTEGER,
          allowNull :  false
       },
        cloth_quantity :{
            type: Sequelize.INTEGER,
            allowNull : false
        },
        image:{
          type:Sequelize.BLOB,
          allowNull : false
        }
       
      
  },{
    timestamps: false
  }
);
//Cloth.hasOne(iron,{ foreignKey: 'cloth_iron_id', targetKey:"id"});
//iron.belongsTo(Cloth,{ foreignKey:"cloth_iron_id",type:Sequelize.INTEGER,targetKey:"id"},);

iron.sync()
    .then((res)=>{ console.log('Iron Table is Created')})
    .catch((res)=>{ console.log('Iron Table Is Not Created')});

module.exports = iron;  