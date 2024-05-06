const {User} = require("../models")
const { Op } = require('sequelize');

async function all(){
    let res
    const result = await User.findAll({
        attributes:["id","state"]
    })
    .then((comment) => {
        res={ "response": 200, "user": comment };
    })
    .catch(error => {
        console.log({"at":"modules/search_user/all","ids":ids,"error":error});
        res={
            "response": 400
        };
    });
    return res
}

async function choice(body){
    let res
    const result =await User.findAll(
        {
        attributes:["id","state"],
        where: {id : body.id}
    })
    .then((comment) => {
        res={ "response": 200, "user": comment };
    })
    .catch(error => {
        console.log({"at":"modules/search_user/choice","id":body.id,"error":error});
        res={
            "response": 400
        };
    });
    return res
}

async function search_init(body){
    let res
    let id=body.id
    const result = await User.findAll({
        attributes:["id","state"],
        where: {id : {[Op.startsWit] : id}}
    })
    .then((comment) => {
        res={ "response": 200, "user": comment };
    })
    .catch(error => {
        console.log({"at":"modules/search_user/choice","id":id,"error":error});
        res={
            "response": 400
        };
    });
    return res
}

async function search_include(id){
    let res
    const result = await User.findAll({
        attributes:["id","state"],
        where: {id : {[Op.substring] : id}}
    })
    .then((comment) => {
        res={ "response": 200, "user": comment };
    })
    .catch(error => {
        console.log({"at":"modules/search_user/choice","id":id,"error":error});
        res={
            "response": 400
        };
    });
    return res
}
module.exports ={
    search: async(type,body)=>{
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
h