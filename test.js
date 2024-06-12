require('dotenv').config();
// const user = require("./modules/user")
// const seed_db=require("./modules/seedDB")
const models=require("./models")
const seed_db=require("./modules/seedDB")
const { Op } = require("sequelize");
// const nodemailer = require('nodemailer');
// const fs = require('node:fs');  
// const cheerio = require('cheerio')
// const {Email} = require('./modules/send_email')
const User =require('./modules/user');
const Article = require("./models/Article");
async function Test(){

    let adds=await seed_db.seed_data('Status')
    let db = models.Status.bulkCreate(adds)
    console.log(JSON.stringify(await db,2,0))
}

Test()