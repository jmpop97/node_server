const { response } = require("express");
const {User,UserInfo} = require("../models")
const { Op } = require('sequelize');

module.exports ={
    patch: async (id,patch_data,res)=>{
        let ress=await Promise.all([
        module.exports.patch_user(id,patch_data),
        module.exports.patch_info(id,patch_data)])
        for (var i in ress){
            if (ress[i].response===200){
            }
            else{
                res.send({"response":400})
                return
            }
        }
        res.send({"response":200})
    },
    patch_user: async (id,patch_data)=>{
        let res
        let patch_datas={email:patch_data.email}
        for (var key in patch_datas){
            if (patch_datas[key]==null){
                delete patch_datas[key]
            }
        }
        console.log(patch_datas)
        await User.update(patch_datas, {
            where: {
                id: id
            }
        })
        .then((comment) => {
            console.log("data is update");
            res={ "response": 200};
        })
        .catch(error => {
            console.log({"at":"moduler/user_update/patch_user","input":{"id":id,"patch_data":patch_data},"error":error});
            res={
                "response": 400,
            };
        });
        return res
    },
    patch_info: async (id,patch_data)=>{
        let res
        let patch_datas={
            birthDay:patch_data.birthDay,
            }
        for (var key in patch_datas){
            if (patch_datas[key]==null){
                delete patch_datas[key]
            }
        }
        console.log(patch_datas)
        await UserInfo.update(patch_datas, {
            where :{userId:"id1"}
        })
            .then((comment) => {
                console.log("data is update");
                res={ "response": 200};
            })
            .catch(error => {
                console.log({"at":"moduler/user_update/patch_info","input":{"id":id,"patch_data":patch_data},"error":error});
                res={
                    "response": 400,
                };
            });
        return res
    },
    
}