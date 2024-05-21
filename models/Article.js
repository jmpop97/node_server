'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
        //creater
        this.belongsTo(models.User,{
          foreignKey:"creater"
        })
        //image
        this.hasMany(models.ArticleImage,{
          foreignKey:"articleId"
        });
        //tag
        this.hasMany(models.Article_Tag,{
          foreignKey:"articleId"
        })
        this.belongsToMany(models.Tag,{
          through:models.Article_Tag,
          foreignKey:"articleId"
        })
        //state
        this.belongsTo(models.Status,{
          foreignKey:"state"
        })
        //permission
        this.hasMany(models.Permission_Article,{
          foreignKey:"articleId"
        })
        this.belongsToMany(models.Permission,{
          through:models.Permission_Article,
          foreignKey:"articleId"
        })
    }
  }
  Article.init({
    articleId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true
    },
    title: {
      type: DataTypes.STRING,
      allowNull:false
    },
    text:{
      type: DataTypes.TEXT
    },
  }, {
    sequelize,
    modelName: 'Article',

  });
  return Article;
};