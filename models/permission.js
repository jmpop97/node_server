'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //user
      this.hasMany(models.UserPermission,{foreignKey:"authName"})
      this.belongsToMany(models.User,{
          through:models.UserPermission,
          foreignKey:'authName',
          type:DataTypes.STRING,
      })
      //api
      this.hasMany(models.PermissionAPI,{foreignKey:"authName"})
      this.belongsToMany(
        models.API,{
         through:models.PermissionAPI,
         foreignKey:'authName',
      });
      //article
      this.hasMany(models.Permission_Article,{foreignKey:"authName"})
      this.belongsToMany(
        models.Article,{
         through:models.Permission_Article,
         foreignKey:'authName',
      });
      // define association here
    }
  }
  Permission.init({
    authName:{
    primaryKey:true,
    type: DataTypes.STRING,
    allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Permission',
    createdAt:false,
    updatedAt:false
  });
  return Permission;
};