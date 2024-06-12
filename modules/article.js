const models=require("../models")
const error_message = require("../cache_DB/error_message")
const { Op } = require("sequelize");

async function createArticle(body){

    let data={
        title:body.title,
        text:body.text,
        state:body.state,
        creater:body.creater,
        Article_Tags:body.tags?.map(x=>{return {tag:x}}),
        ArticleImages:body.images?.map(x=>{return {image:x}}),
        Permission_Articles:body.permissions?.map(x=>{return {authName:x}})
    }
    if (!data.ArticleImages){
        delete data['ArticleImages']
    }
    if (!data.Article_Tags){
        delete data['Article_Tags']
    }
    else{
        await models.Tag.bulkCreate(
            data.Article_Tags
            ,{updateOnDuplicate: ["tagName"]}
        )
    }
    await models.Article.create(
        data,
        {include:[
            models.ArticleImage,
            models.Article_Tag,
            models.Permission_Article,
            ]
        }
    )
    .catch((err)=>
        res = error_message.get(24,{body,err})
    )
    .then((article)=>{
        // delete article.dataValues.Permission_Articles
        res = {response:200,article:article}
    })
    
    return res
}

async function patchArticle(body){

    let data={
        articleId:body.articleId,
        creater:body.creater,
        title:body.title,
        text:body.text,
        state:body.state,
        Article_Tags:body.tags,
        ArticleImages:body.images,
        Permission_Articles:body.permissions
    }
    if (!data.ArticleImages){
        delete data['ArticleImages']
    }

    article= await models.Article.findByPk(data.articlePk,
    {include:[
    models.ArticleImage,
    models.Article_Tag,
    models.Permission_Article,
    ]}
    )
    if (!article){
        return error_message.get(25,data.articleId)
    }
    else if (article.creater!=data.creater){
        return error_message.get(26,data.articleId)
    }
    else{
        await tag_update(data,article)
        await permission_update(data,article)
        await image_update(data,article)
        await article.update(data)
    }


    // await permission_update(data,article)


article= await models.Article.findByPk(data.articleId,
    {include:[
    models.ArticleImage,
    models.Article_Tag,
    models.Permission_Article,
    ]}
)
    return {response:200,article:article}
}


async function tag_update(data,article){
    if (!data.Article_Tags){
        await models.Article_Tag.destroy(
            {where:{
                articleId:data.articleId,
        }})
    }
    else{
        await models.Article_Tag.destroy(
            {where:{
                articleId:data.articleId,
                tag:{
                [Op.notIn]:data.Article_Tags
        }}})
        await models.Tag.bulkCreate(
        data.Article_Tags.map(x=>{return {tag:x}})
        ,{updateOnDuplicate: ["tag"]}
        )
    }
    let add = []
    for (check in data.Article_Tags){
        bool_in=false
        for (in_check in article.Article_Tags){
            if(article?.Article_Tags[in_check].tag ==data.Article_Tags[check]){
                bool_in=true
                break
            }
        }
        if (!bool_in){
            add.push({
                tag:data.Article_Tags[check],
                articleId:data.articleId}
            )
        }
    }
    models.Article_Tag.bulkCreate(add)
}

async function permission_update(data,article){
    if (!data.Permission_Articles){
        await models.Permission_Article.destroy(
            {where:{
                articleId:data.articleId,
            }})
        }
    else{
        await models.Permission_Article.destroy(
            {where:{
                articleId:data.articleId,
                authName:{
                    [Op.notIn]:data.Permission_Articles
                }}})
    }
    let add = []
    for (check in data.Permission_Articles){
        bool_in=false
        for (in_check in article.Permission_Articles){
            if(article?.Permission_Articles[in_check].authName ==data.Permission_Articles[check]){
                bool_in=true
                break
            }
        }
        if (!bool_in){
            add.push({
                authName:data.Permission_Articles[check],
                articleId:data.articleId}
            )
        }
    }
    models.Permission_Article.bulkCreate(add,{where:{articleId:data.articleId}})
}

async function image_update(data,article){
    if (!data.ArticleImages){
        await models.ArticleImage.destroy(
            {where:{
                articleId:data.articleId,
            }})
        }
    else{
        await models.ArticleImage.destroy(
            {where:{
                articleId:data.articleId,
                image:{
                    [Op.notIn]:data.ArticleImages
                }}})
    }
    let add = []
    
    for (check in data.ArticleImages){
        bool_in=false
        for (in_check in article.ArticleImages){
            if(article?.ArticleImages[in_check].image ==data.ArticleImages[check]){
                bool_in=true
                break
            }
        }
        if (!bool_in){
            add.push({
                image:data.ArticleImages[check],
                articleId:data.articleId}
            )
        }
    }
    models.ArticleImage.bulkCreate(add,{where:{articleId:data.articleId}})   
}

module.exports = {
    createArticle,
    patchArticle}