const {API} = require("../models")
const NodeCache = require( "node-cache" );
const cache = new NodeCache()
const { Op } = require("sequelize");



async function get(i){
    value = cache.get(i)
    if (value==undefined){
        value = await API.findOne({where:{apiId:i}})
        cache.set(value.apiId,value)
    }
    return value
}

async function patch(i){
    value = await API.findOne({where:{apiId:i}})
    cache.set(value.apiId,value)
    return value
}

async function setAll(){
    db = await API.findAll({})
    for(j in db){
        cache.set(db[j].apiId,db[j])
    }
    return db
}

async function search(apiId){
    db = await PermissionAPI.findAll({
        where:{apiId:{[Op.substring]:apiId}}
    })
    return db
}
module.exports={
    get,
    patch,
    setAll,
    search,
}
