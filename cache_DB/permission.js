const {Permission} = require("../models")
const NodeCache = require( "node-cache" );
const cache_permission = new NodeCache()
async function get(i){
    value = cache_permission.get(i)
    if (value==undefined){
        perms = await Permission.findAll({where:{authName:i}})
        console.log(perms)
        for(j in perms){
            cache_permission.set(perms[j].authName,perms[j].authId)
        }
        value = cache_permission.get(i)
    }
    return {response:200,value:value}
}


async function patch(i){
    perms = await Permission.findAll({where:{authName:i}})
    for(j in perms){
        console.log("save")
        cache_permission.set(perms[j].authName,perms[j].authId)
    }
    value = cache_permission.get(i)
    return {response:200,value:value}
}

async function setAll(){
    perms = await Permission.findAll({})
    for(j in perms){
        console.log("save")
        cache_permission.set(perms[j].authName,perms[j].authId)
    }
    return perms
}
module.exports={
    get,
    patch,
    setAll
}




// Permission.findAll({}).then((_)=>
//     {console.log("find")
//     // console.log(_)
//     }
//     )