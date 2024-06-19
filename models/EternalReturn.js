'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ER extends Model {
    static associate(models) {
    }
  }
  ER.init(
    {
      eternalReturnPk: {
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
        },
      rank200Mmr:{
        type: DataTypes.INTEGER,
        },
      rank200_minusMmr150people:{
        type: DataTypes.INTEGER,
        },
  }, {
    sequelize,
    modelName: 'EternalReturn',
    tableName: 'EternalReturn',
    updatedAt:false,

  });
  return ER;
};