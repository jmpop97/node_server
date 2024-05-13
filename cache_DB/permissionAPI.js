const {API,Permission} = require("../models")
const NodeCache = require( "node-cache" );
const cache = new NodeCache()
const { Op } = require("sequelize");



async function get(i){
    value = cache.get(i)
    if (value==undefined){
        db = await await API.findOne(
            {
                where:{apiId:i},
                include:
                {
                    model:Permission,
                    through:{
                        attributes:[]
                    }
                }
            }
        )
        if (db){
            value=db.Permissions.map(Permissions=>Permissions.authName)
            cache.set(i,value)
        }
    }
    return value
}

async function patch(i){

    db = await await API.findOne(
        {
            where:{apiId:i},
            include:
            {
                model:Permission,
                through:{
                    attributes:[]
                }
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
    db = await API.findAll({include:
        {
            model:Permission,
            through:{
                attributes:[]
            }
        }})
    for(j in db){
        value=db[j].Permissions.map(Permissions=>Permissions.authName)
        cache.set(db[j].apiId,value)
    }
    return db
}

async function search(apiId){
    db = await API.findAll({include:
        {
            model:Permission,
            through:{
                attributes:[]
            }
        }},{
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
