const {ErrorMessage} = require("../models")
const NodeCache = require( "node-cache" );
const cache = new NodeCache()
const { Op } = require("sequelize");



async function get(i){
    value = cache.get(i)
    if (value==undefined){
        db = await ErrorMessage.findAll({where:{id:i}})
        for(j in db){
            cache.set(db[j].id,db[j])
        }
        value = cache.get(i)
    }
    return value
}

async function patch(i){
    db = await ErrorMessage.findAll({where:{id:i}})
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
