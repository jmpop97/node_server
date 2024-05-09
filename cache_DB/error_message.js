const {ErrorMessage} = require("../models")
const NodeCache = require( "node-cache" );
const cache = new NodeCache()
const { Op } = require("sequelize");



async function get(i,input=""){
    value = cache.get(i)
    if (value==undefined){
        db = await ErrorMessage.findAll({where:{id:i}})
        for(j in db){
            cache.set(db[j].id,db[j])
        }
        value = cache.get(i)
    }
    let{at,response,detail,intro}=value
    console.log(JSON.stringify({at,i,intro,input:input}, null, 2))
    return {response,detail}
}

async function patch(i){
    db = await ErrorMessage.findAll({where:{id:i}})
    console.log(db)
    for(j in db){
        cache.set(db[j].id,db[j])
    }
    value = cache.get(i)
    return value
}

async function setAll(){
    db = await ErrorMessage.findAll({})
    for(j in db){
        cache.set(db[j].id,db[j])
    }
    return db
}

async function search(at){
    db = await ErrorMessage.findAll({
        where:{at:{[Op.substring]:at}}
    })
    return db
}
module.exports={
    get,
    patch,
    setAll,
    search,
}
