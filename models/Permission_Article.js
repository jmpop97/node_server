'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission_Article extends Model {
    static associate(models) {
      this.belongsTo(models.Article,{foreignKey:"articleId"})
      this.belongsTo(models.Permission,{foreignKey:"authName"})
    }
  }
  Permission_Article.init({
    id:{
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