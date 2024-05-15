'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Articles', 
    {
      articleId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull:false
        
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
          key:'id'
        },
        unique:true,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      title:{
        type:Sequelize.TEXT,
        allowNull:false
      },
      text:{
        type:Sequelize.TEXT
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

    await queryInterface.createTable('Tags', 
    {
      tagName: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      }
    },
    )
    await queryInterface.createTable('ArticleImage',{
      image:{
        type:Sequelize.STRING,
        unique:true,
        primaryKey:true
      }
    }) 


    await queryInterface.createTable('ArticleTags',{
      id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        autoIncrementIdentity:true},
      articleId:{
        type:Sequelize.INTEGER,
        references:{
          model:"Articles",
          key:"articleId"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      tag:{
        type:Sequelize.STRING,
        references:{
          model:"Tags",
          key:"tagName"
        }
      },
    }) 
    await queryInterface.createTable('ArticleImages',{
          id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            autoIncrementIdentity:true},
          articleId:{
            type:Sequelize.INTEGER,
            references:{
              model:"Articles",
              key:"articleId"
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          image:{
            type:Sequelize.STRING,
            references:{
              model:"ArticleImage",
              key:"image"
            }
          },
    })
    await queryInterface.createTable('PermissionArticle',{
      id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        autoIncrementIdentity:true},
      articleId:{
        type:Sequelize.INTEGER,
        references:{
          model:"Articles",
          key:"articleId"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      permission:{
        type:Sequelize.STRING,
        references:{
          model:"Permissions",
          key:"authName"
        }
      },
})




    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('PermissionArticle');
    await queryInterface.dropTable('ArticleImages');
    await queryInterface.dropTable('ArticleTags');
    await queryInterface.dropTable('ArticleImage');
    await queryInterface.dropTable('Tags');
    await queryInterface.dropTable('Articles');

    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
