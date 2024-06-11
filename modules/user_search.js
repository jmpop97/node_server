const {User} = require("../models")
const { Op } = require('sequelize');
const error_message=require('../cache_DB/error_message')

async function all(){
    let res
    const result = await User.findAll({
        attributes:["userId","state"]
    })
    .then((comment) => {
        res={ "response": 200, "user": comment };
    })
    .catch(error => {
        res=error_message.get(13,{error});
    });
    return res
}

async function choice(body){
    let res
    const result =await User.findAll(
        {
        attributes:["userId","state"],
        where: {id : body.id}
    })
    .then((comment) => {
        res={ "response": 200, "user": comment };
    })
    .catch(error => {
        res=error_message.get(14,{body,error});
    });
    return res
}

async function search_init(body){
    let res
    let id=body.id
    const result = await User.findAll({
        attributes:["userId","state"],
        where: {id : {[Op.startsWith] : id}}
    })
    .then((comment) => {
        res={ "response": 200, "user": comment };
    })
    .catch(error => {
        res=error_message.get(15,{body,error});
    });
    return res
}

async function search_include(id){
    let res
    const result = await User.findAll({
        attributes:["userId","state"],
        where: {id : {[Op.substring] : id}}
    })
    .then((comment) => {
        res={ "response": 200, "user": comment };
    })
    .catch(error => {
        res=error_message.get(16,{id,error});
    });
    return res
}
module.exports ={
    search: async(body)=>{
        let {type}=body
        switch(type){
            default:
                body.id=body.log_in_user
                return choice(body)
            case '*':
            case 'all':
                return await all()
            case 'choice':
                return await choice(body)
            case 'search_init':
                return await search_init(body)
            case 'search_include':
                return await search_include(body)
            }
    }
}
