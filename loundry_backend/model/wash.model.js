const dbConnection = require('../Database/dbConnection');
const Sequelize = require('sequelize');

const Cloth = require('./cloth.model')

const wash = dbConnection.define('wash',{
        price :{
            type: Sequelize.INTEGER,
            allowNull :  false
        },
      
  },{
    timestamps: false
  }
);

wash.belongsTo(Cloth,{ foreignKey : "cloth_id",type:Sequelize.INTEGER,targetKey:"id"},);

wash.sync()
    .then((res)=>{ console.log('Wash Table Is Created')})
    .catch((res)=>{ console.log('Wash Table Is Not Created')});

module.exports = wash; 