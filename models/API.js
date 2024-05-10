'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class API extends Model {

    static associate(models) {
      // define association here
      this.hasMany(models.PermissionAPI,{foreignKey:"apiId"})
      this.belongsToMany(
        models.Permission,{
          through:models.PermissionAPI,
          foreignKey:'apiId',
          type:DataTypes.STRING
        }
      );
    }
  }
  API.init(
    {
      apiId: {
        primaryKey:true,
        type:DataTypes.STRING,
        allowNull:false
     },
    },
    {
    sequelize,
    modelName: 'API',
    timestamps:false,
  });
  return API;
};