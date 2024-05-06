'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ErrorMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ErrorMessage.init({
    id: {
      type:DataTypes.INTEGER,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true
    },
    at:{
      type: DataTypes.STRING,
      allowNull:false
    },
    response: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    detail:{
      type: DataTypes.TEXT
    },
    intro:{
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'ErrorMessage',
    timestamps:false
  });
  return ErrorMessage;
};