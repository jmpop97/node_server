class User{
    async logUp(id,password,email,authName="User"){
        let res
        let hashpassword = await module.exports.hashPassword(id,password)
        let create_id = {
            id: id,
            password: hashpassword,
            email: email,
            UserInfo:{userId:id},
        };
        await User.create(create_id,{include:[UserInfo]})
        .then(_ => {
            //need fix-combine User&UserPermission
            UserPermission.create({userId:id,authName:authName})
            .catch((error)=>{error_message.get(8,{id,authName,error})})
            res={ "response": 200 };
        })
        .catch(error => {
            error_message.get(9,{id,password,email,authName,error})
        });
        return res
    }
}



module.exports={User}