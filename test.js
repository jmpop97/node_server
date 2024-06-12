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
const User =require('./modules/user');
const Article = require("./models/Article");
async function Test(){
    data ={
        title:"제목",
        text:"내용",
        state:"Active",
        creater:"Local_id1",
        // ArticleImages:[{image:"2"}],
        Article_Tags:[{tagName:"test"}],
        Permission_Articles:[{authName:"User"}]
    }
    await models.Tag.bulkCreate(
        data.Article_Tags
        ,{updateOnDuplicate: ["tagName"]}
    )
    let db = await models.Article.create(
        data,{
            include:[
                models.ArticleImage,
                models.Article_Tag,
                models.Permission_Article,
            ]
        }
        )
    console.log(JSON.stringify(await db,2,0))
}

Test()