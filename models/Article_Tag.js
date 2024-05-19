'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article_Tag extends Model {
    static associate(models) {
      this.belongsTo(models.Article,{foreignKey:"articleId"})
      this.belongsTo(models.Tag,{foreignKey:"tag"})
    }
  }
  Article_Tag.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    articleId:{
      type:DataTypes.INTEGER
    },
    tag:{
      type:DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Article_Tag',
    timestamps:false
  });
  return Article_Tag;}