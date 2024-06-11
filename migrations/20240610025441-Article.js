'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Articles', 
      {
        articlePk: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        state:{        
          type: Sequelize.STRING,
          references:{
            model:'Status',
            key:'stateName'
          },
          defaultValue: "Active",
          allowNull:false,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        creater:{
          type: Sequelize.STRING,
          references:{
            model:'Users',
            key:'userId'
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        title:{
          type:Sequelize.STRING,
          allowNull:false,
        },
        text:{
          type:Sequelize.TEXT,
          defaultValue:""
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
      },
    )
    await queryInterface.createTable('ArticleImages',{
      articleImagePk:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      }, 
      articleId:{
          type:Sequelize.INTEGER,
          references:{
            model:"Articles",
            key:"articlePk"
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      image:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
        },
      }
    )
    await queryInterface.createTable('Tags', 
      {
        tagPk:{
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        tagName: {
          type: Sequelize.STRING,
          allowNull: false,
          unique:true
        }
      },
      )
    await queryInterface.createTable('Article_Tags',{
        articleTagPk:{
          type:Sequelize.INTEGER,
          primaryKey:true,
          autoIncrement:true,
        },
        articleId:{
          type:Sequelize.INTEGER,
          references:{
            model:"Articles",
            key:"articlePk"
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        tagName:{
          type:Sequelize.STRING,
          references:{
            model:"Tags",
            key:"tagName"
          }
        },
      }) 
    await queryInterface.createTable('Permission_Articles',{
        permissionArticlePk:{
          type:Sequelize.INTEGER,
          primaryKey:true,
          autoIncrement:true,
        },
        articleId:{
          type:Sequelize.INTEGER,
          references:{
            model:"Articles",
            key:"articlePk"
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        authName:{
          type:Sequelize.STRING,
          references:{
            model:"Permissions",
            key:"authName"
          }
        },
      })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Permission_Articles');
    await queryInterface.dropTable('Article_Tags');
    await queryInterface.dropTable('ArticleImages');
    await queryInterface.dropTable('Tags');
    await queryInterface.dropTable('Articles');
  }
};
