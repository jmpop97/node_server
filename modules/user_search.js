const {User} = require("../models")
const { Op } = require('sequelize');

module.exports ={
    all: async (res)=>{
        const result = User.findAll({
            attributes:["id"]
        })
        .then((comment) => {
            res.send({ "response": 200, "user": comment });
        })
        .catch(error => {
            console.log({"at":"modules/search_user/all","ids":ids,"error":error});
            res.send({
                "response": 400
            });
        });
    },
    choice: async (ids,res)=>{
        const result = User.findAll({
            attributes:["id"],
            where: {id : ids}
        })
        .then((comment) => {
            res.send({ "response": 200, "user": comment });
        })
        .catch(error => {
            console.log({"at":"modules/search_user/choice","ids":ids,"error":error});
            res.send({
                "response": 400
            });
        });
    },
    search_init: async (id,res)=>{
        const result = User.findAll({
            attributes:["id"],
            where: {id : {[Op.startsWith] : id}}
        })
        .then((comment) => {
            res.send({ "response": 200, "user": comment });
        })
        .catch(error => {
            console.log({"at":"modules/search_user/choice","id":id,"error":error});
            res.send({
                "response": 400
            });
        });
    },
    search_include: async (id,res)=>{
        const result = User.findAll({
            attributes:["id"],
            where: {id : {[Op.substring] : id}}
        })
        .then((comment) => {
            res.send({ "response": 200, "user": comment });
        })
        .catch(error => {
            console.log({"at":"modules/search_user/choice","id":id,"error":error});
            res.send({
                "response": 400
            });
        });
    },
}