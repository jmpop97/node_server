'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArticleImage extends Model {
    static associate(models) {
        //article
        this.belongsTo(models.Article,{foreignKey:'articleId'})
    }
  }
  ArticleImage.init({
    articleId:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    image:{
      type:DataTypes.STRING,
      allowNull:false,
      primaryKey:true
    },
  }, {
    sequelize,
    modelName: 'ArticleImage',
    timestamps:false
  });
  return ArticleImage;}