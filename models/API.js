'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class API extends Model {

    static associate(models) {
      // define association here
      this.hasMany(models.Permission_API,{foreignKey:"apiName",sourceKey:"apiName"})
      this.belongsToMany(
        models.Permission,{
          through:models.Permission_API,
          foreignKey:'apiName',
          sourceKey:"apiName",
        }
      );
    }
  }
  API.init(
    {
      apiPk:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
      },
      apiName: {
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
     },
    },
    {
    sequelize,
    modelName: 'API',
    timestamps:false,
  });
  return API;
};