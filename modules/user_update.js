const { response } = require("express");
const {User,UserInfo} = require("../models")
const { Op } = require('sequelize');
async function patch(body){
    let res
    let ress=await Promise.all([
    patch_user(body),
    patch_info(body)])
    for (var i in ress){
        if (ress[i].response===200){
        }
        else{
            res={"response":400}
            return res
        }
    }
    res={"response":200}
    return res
}

async function patch_user(body){
    let res
    let patch_datas={email : body.email}
    await User.update(patch_datas, {
        where: {
            id: body.id
        }
    })
    .then((comment) => {
        console.log("data is update");
        res={ "response": 200};
    })
    .catch(error => {
        console.log({"at":"moduler/user_update/patch_user","input":{"body":body},"error":error});
        res={
            "response": 400,
        };
    });
    return res
}

async function patch_info(body){
    let res
    let patch_datas={
        birthDay:body.birthDay,
        }
    await UserInfo.update(patch_datas, {
        where :{userId:body.id}
    })
        .then((comment) => {
            console.log("data is update");
            res={ "response": 200};
        })
        .catch(error => {
            console.log({"at":"moduler/user_update/patch_info","input":{"body":body},"error":error});
            res={
                "response": 400,
            };
        });
    return res
}
module.exports ={
    patch:patch
}