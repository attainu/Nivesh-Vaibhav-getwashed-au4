const dbConnection = require('../Database/dbConnection');
const Sequelize = require('sequelize');

const Cloth = require('./cloth.model')

const iron = dbConnection.define('iron',{
        price :{
            type: Sequelize.INTEGER,
            allowNull :  false
        },
      
  },{
    timestamps: false
  }
);
//Cloth.hasOne(iron,{ foreignKey: 'cloth_iron_id', targetKey:"id"});
iron.belongsTo(Cloth,{ foreignKey:"cloth_iron_id",type:Sequelize.INTEGER,targetKey:"id"},);

iron.sync()
    .then((res)=>{ console.log('Iron Table is Created')})
    .catch((res)=>{ console.log('Iron Table Is Not Created')});

module.exports = iron;  