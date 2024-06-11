const models = require("../models")
const NodeCache = require( "node-cache" );
const cache = new NodeCache()
const { Op } = require("sequelize");



async function get(i){
    value = cache.get(i)
    if (value==undefined){
        db = await models.API.findOne(
            {
                where:{apiName:i},
                include:
                {
                    model:models.Permission,
                    through:{
                        attributes:[]
                    },
                    attributes:['authName']
                }
            }
        )
        if (db){
            value=db.Permissions.map(Permissions=>Permissions.authName)
            cache.set(i,value)
        }
        else{
            console.log(i,"permission존재하지 않음")
            value=["All"]
            
        }
    }
    return value
}

async function patch(i){

    db = await models.API.findOne(
        {
            where:{apiName:i},
            include:
            {
                model:models.Permission,
                through:{
                    attributes:[]
                },
                attributes:['authName']
            }
        }
    )
    if (db){
        value=db.Permissions.map(Permissions=>Permissions.authName)
        cache.set(i,value)
    }
    return value
}

async function setAll(){
    db = await models.API.findAll({include:
        {
            model:models.Permission,
            through:{
                attributes:[]
            },
            attributes:['authName']
        }})
    for(j in db){
        value=db[j].Permissions.map(Permissions=>Permissions.authName)
        cache.set(db[j].apiName,value)
    }
    return db
}

async function search(apiId){
    db = await models.API.findAll({include:
        {
            model:models.Permission,
            through:{
                attributes:[]
            },
            attributes:['authName']
        }},{
        where:{apiName:{[Op.substring]:apiId}}
    })
    return db
}
module.exports={
    get,
    patch,
    setAll,
    search,
}
