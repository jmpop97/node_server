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
      this.hasMany(models.Permission_User,{foreignKey:"authName",sourceKey:"authName"})
      this.belongsToMany(models.User,{
          through:models.Permission_User,
          foreignKey:'authName',
          sourceKey:'authName'
      })
      //api
      this.hasMany(models.Permission_API,{foreignKey:"authName",sourceKey:"authName"})
      this.belongsToMany(
        models.API,{
         through:models.Permission_API,
         foreignKey:'authName',
         sourceKey:'authName'
      });
      //article
      this.hasMany(models.Permission_Article,{foreignKey:"authName",sourceKey:"authName"})
      this.belongsToMany(
        models.Article,{
         through:models.Permission_Article,
         foreignKey:'authName',
      });
      // define association here
    }
  }
  Permission.init({
    permissionPk:{
      type:DataTypes.INTEGER,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true
    },
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