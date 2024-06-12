'use strict';
const {
  Model
} = require('sequelize');
const Article_Tag = require('./Article_Tag');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      this.hasMany(models.Article_Tag,{foreignKey:"tagName",sourceKey:"tagName"})
      this.belongsToMany(models.Article,{
        through:models.Article_Tag,
        foreignKey:"tagName",
      })
    }
  }
  Tag.init({
    tagPk:{
      primaryKey:true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      },
    tagName:{
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
      }
    
    }, {
    sequelize,
    modelName: 'Tag',
    timestamps:false
  });
  return Tag;}