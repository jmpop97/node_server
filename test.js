


const seed_db=require("./modules/seedDB")
const models=require("./models")
const Article_Image = require("./models/ArticleImage")
const ArticleImage = require("./models/ArticleImage")
const Article_Tag = require("./models/Article_Tag")
const Article = require("./models/Article")
//




// const cache_api = require("./cache_DB/permissionAPI")
// const check = require("./modules/permission")

const check=require('./modules/article')
async function test(){
    // t="13"
    // let data={
    //     title:"test2",
    //     text:`
    //     `,
    //     state:"Active",
    //     Article_Tags:[{tag:t}],
    //     // Tags:[{tag:10}],
    //     ArticleImages:[{image:t}],
    //     Permission_Article:[{authName:"User"}]
    // }
    // a=await model.Tag.bulkCreate([{tagName:1},{tagName:t}],{updateOnDuplicate: ["tagName"]})
    // b= await model.Article.create(data,
    //      {include:[
    //     model.ArticleImage,
    //     model.Article_Tag,
    //     model.Permission_Article,
    // ]},{updateOnDuplicate: ["tagName"]})


    // a= await model.Article.findOne({
    //     include:[model.Tag],
    //     order:[['createdAt','DESC']]
    // })
    // console.log(JSON.stringify(a, null, 2))
    body={
        id:25,
        title:"test",
        state:"Active",
        tags:["1","3"],
        permissions:["Admin"],
        images:["test"],
    }

    check.patchArticle(body)


}




test()