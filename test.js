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
    datas=await rank_datas()
    models.EternalReturn.create(datas)
    console.log(datas)
    // models.UserIPLog.create({userId:"Local_admin",ip:"!2",api:"test"})
}


async function rank_datas(){
    data = await rank_data_page(2)
    rank200Mmr=data["leaderboards"].pop()["mmr"]
    rank200_minusMmr150people=0
    limit_mmr=rank200Mmr-150
    for (let i=3;i<=10;i++){
        data= await rank_data_page(i)
        for(j in data["leaderboards"]){
            if(data["leaderboards"][j]["mmr"]>=limit_mmr){
                rank200_minusMmr150people+=1
            }
            else{
                return {rank200Mmr,rank200_minusMmr150people}
            }
        }
    }
    return {rank200Mmr,rank200_minusMmr150people}
}

async function rank_data_page(page){
    url=`https://er-node.dakgg.io/api/v0/leaderboard?page=${page}&seasonKey=SEASON_13&serverName=seoul&teamMode=SQUAD&hl=ko`
    get_data = await fetch(url,
        {method:"GET"})
    data=await get_data.json()
    return data
}

Test()