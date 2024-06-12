'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission_Article extends Model {
    static associate(models) {
      this.belongsTo(models.Article,{foreignKey:"articleId",targetKey:"articlePk"})
      this.belongsTo(models.Permission,{foreignKey:"authName",targetKey:"authName"})
    }
  }
  Permission_Article.init({
    permissionArticlePk:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    articleId:{
      type:DataTypes.INTEGER
    },
    authName:{
      type:DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Permission_Article',
    timestamps:false
  });
  return Permission_Article;}