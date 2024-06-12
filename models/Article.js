'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
        //creater
        this.belongsTo(models.User,{
          foreignKey:"creater",
          targetKey:"userId",
        })
        //image
        this.hasMany(models.ArticleImage,{
          foreignKey:"articleId",
          sourceKey:"articlePk"
        });
        //tag
        this.hasMany(models.Article_Tag,{
          foreignKey:"articleId",
          sourceKey:"articlePk"
        })
        this.belongsToMany(models.Tag,{
          through:models.Article_Tag,
          foreignKey:"articleId",
          sourceKey:"articlePk"
        })
        //state
        this.belongsTo(models.Status,{
          foreignKey:"state",
          targetKey:"stateName"
        })
        //permission
        this.hasMany(models.Permission_Article,{
          foreignKey:"articleId",
          sourceKey:"articlePk"
        })
        this.belongsToMany(models.Permission,{
          through:models.Permission_Article,
          foreignKey:"articleId",
          sourceKey:"articlePk"
        })
    }
  }
  Article.init({
    articlePk: {
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