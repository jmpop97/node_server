// require('dotenv').config();
// const user = require("./modules/user")
// const seed_db=require("./modules/seedDB")
// const models=require("./models")
// const nodemailer = require('nodemailer');
// const fs = require('node:fs');  
// const cheerio = require('cheerio')
// const {Email} = require('./modules/send_email')
// const User =require('./modules/user')


const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    // database: 'NodeServer',
    // user: 'jmpop',
    // password: 'node3.141592',    
    'NodeServer',
    'jmpop',
    'node3.141592',
{
  dialect: 'postgres',
  host: 'node-server.ct4i8qmg4xyk.ap-northeast-2.rds.amazonaws.com',
  port: 5432,
  dialectOptions: {
    ssl: {
      require: true, // SSL 사용을 강제
      rejectUnauthorized: false, // 자체 서명된 인증서 허용
    },
  }
  // ssl: true,
//   clientMinMessages: 'notice',
});
async function Test(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

Test()