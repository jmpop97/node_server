'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article_Tag extends Model {
    static associate(models) {
      this.belongsTo(models.Article,{foreignKey:"articleId",targetKey:"articlePk"})
      this.belongsTo(models.Tag,{foreignKey:"tagName",targetKey:"tagName"})
    }
  }
  Article_Tag.init({
    articleTagPk:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    articleId:{
      type:DataTypes.INTEGER
    },
    tagName:{
      type:DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Article_Tag',
    timestamps:false
  });
  return Article_Tag;}