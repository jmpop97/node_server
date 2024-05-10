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
      this.hasMany(models.UserPermission,{foreignKey:"authName"})
      this.belongsToMany(models.User,{
          through:models.UserPermission,
          foreignKey:'authName',
          type:DataTypes.STRING,
      })
      this.hasMany(models.PermissionAPI,{foreignKey:"authName"})
      this.belongsToMany(
        models.API,{
         through:models.PermissionAPI,
         foreignKey:'authName',
         type:DataTypes.STRING
       }
     );
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