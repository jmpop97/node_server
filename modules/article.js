const models=require("../models")
const error_message = require("../cache_DB/error_message")
async function createArticle(body){

    let data={
        title:body.title,
        text:body.text,
        state:body.state,
        Article_Tags:body.tags?.map(x=>{return {tag:x}}),
        ArticleImages:body.images?.map(x=>{return {image:x}}),
        Permission_Article:body.permissions?.map(x=>{return {authName:x}})
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
            ,{updateOnDuplicate: ["tag"]}
        )
    }
    article= await models.Article.create(
        data,
        {include:[
            models.ArticleImage,
            models.Article_Tag,
            models.Permission_Article,
        ]}
    )
    .catch((err)=>
        error_message.get(24,{body,err})
    )

    return {response:200,article:article}
}


module.exports = {createArticle}