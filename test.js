// require('dotenv').config();
// const user = require("./modules/user")
// const seed_db=require("./modules/seedDB")
const models=require("./models")
const seed_db=require("./modules/seedDB")
const { Op } = require("sequelize");
// const nodemailer = require('nodemailer');
// const fs = require('node:fs');  
// const cheerio = require('cheerio')
// const {Email} = require('./modules/send_email')
const User =require('./modules/user')
async function Test(){
    add =[
        { userId: 'Local_id1', authName: 'User' },
        { userId: 'Local_id1', authName: 'Admin' }
      ]
    let db = await models.Permission_User.bulkCreate(
        add,
        )
    console.log(JSON.stringify(await db,2,0))
}

Test()