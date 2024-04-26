const {User} = require("../models")
const { Op } = require('sequelize');

module.exports ={
    patch: async (id,patch_data,res)=>{

        let patch_datas={email:patch_data.email}
        for (var key in patch_datas){
            if (patch_datas[key]==null){
                delete patch_datas[key]
            }
        }

        console.log(patch_datas)
        User.update(patch_datas, {
            where: {
                id: id
            }
        })
            .then((comment) => {
                console.log("data is update");
                res.send({ "response": 200});
            })
            .catch(error => {
                console.log({"at":"moduler/user_update/patch","input":{"id":id,"patch_data":patch_data},"error":error});
                res.send({
                    "response": 400,
                });
            });
    },
}