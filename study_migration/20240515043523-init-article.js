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
        primaryKey:true
      },
    })
    await queryInterface.createTable('Tags', 
    {
      tag: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      }
    },
    )
    await queryInterface.createTable('Article_Tags',{
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
          key:"tag"
        }
      },
    }) 
    await queryInterface.createTable('Permission_Articles',{
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
      authName:{
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
    await queryInterface.dropTable('Permission_Articles');
    await queryInterface.dropTable('Article_Tags');
    await queryInterface.dropTable('ArticleImages');
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
