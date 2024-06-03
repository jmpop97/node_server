'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Authenfication extends Model {
    static associate(models) {
    }
  }
  Authenfication.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    type:{
      type:DataTypes.INTEGER
    },
    email:{
      type:DataTypes.STRING
    },
    key:{
      type:DataTypes.STRING
    },
    count:{
      type:DataTypes.INTEGER,
      defaultValue:1,
    }
  }, {
    sequelize,
    modelName: 'Authenfication',
  });
  return Authenfication;}