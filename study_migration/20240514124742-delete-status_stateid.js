'use strict';
const { Transaction, QueryTypes } = require('sequelize');
const {Status} = require('../models')
const seed_db =require('../modules/seedDB')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // user_칼럼 변경
    await queryInterface.renameColumn('Users','state','stateId')

    //state테이블명 변경
    await queryInterface.renameTable('Status','beforeStatus')

    // 새로운 state 테이블 생성
    await queryInterface.createTable('Status', 
    { 
      stateName: {
        type: Sequelize.STRING,
        unique:true,
        allowNull:false,
        primaryKey:true
    }})

    // 새로운 state생성
    var adds=await seed_db.seed_data('Status',0,2)
    await Status.bulkCreate(adds)

    //user.state 생성
    await queryInterface.addColumn("Users","state",{
      type: Sequelize.STRING,
      defaultValue:"Active",
      allowNull:false}
    )
    //fk해제,연결
    await queryInterface.removeConstraint("Users",'Users_state_Status_fk')
    await queryInterface.addConstraint("Users",{
      fields:["state"],
      type:"foreign key",
      references:{
        table:"Status",
        field:"stateName"
      },
      onDelete:"cascade",
      onUpdate:"cascade"
    })

    // state 원래상태로 변경
    adds=await seed_db.seed_data('Status_1',0,2)
    let getquery=`UPDATE public."Users"
    SET state = 
    CASE
    `
    for (let i=0;i<adds.length;i++){
      getquery+= `WHEN "stateId" = ${adds[i].stateId} THEN '${adds[i].stateName}'`
    }
    getquery+=` END;`
    await queryInterface.sequelize.query(getquery)

    //쓸모없는 데이터 삭제
    await queryInterface.removeColumn('Users','stateId')
    await queryInterface.dropTable('berforeStatus')

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
