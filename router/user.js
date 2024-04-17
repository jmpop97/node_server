let express = require("express")
const models = require("../models")
const router = express.Router();
const { Op } = require('sequelize');

출처: https://inpa.tistory.com/entry/ORM-📚-시퀄라이즈-쿼리-문법 [Inpa Dev 👨‍💻:티스토리]
router.post("",(req,res)=>{
    models.User.create(req.body)
    .then(_=>{console.log("data is created!")
    res.send({"response":200})
    })
    .catch(error=>{console.log("error")
    res.send({
        "response":400,
        "error":error.errors[0].message})
        })
})

router.get("",(req,res)=>{
    models.User.findAll({
    })
    .then((comment)=>{console.log("data is read!")
    res.send({"response":200,"user":comment})
    })
    .catch(error=>{console.log("error")
    res.send({
        "response":400,
        "error":error.errors[0].message})
        })
})


router.get("/:id",(req,res)=>{
    models.User.findAll({
        where:{
            id:req.params.id
        }
    })
    .then((comment)=>{console.log("data is read!")
    res.send({"response":200,"user":comment})
})
.catch(error=>{console.log("error")
res.send({
    "response":400,
    "error":error})
})
})


router.patch("/:id",(req,res)=>{
    // id change danger
        models.User.update(req.body,{
        where:{
        id:req.params.id
    }
    })
    .then((comment)=>{console.log("data is update")
    res.send({"response":200,"user":comment})
    })
    .catch(error=>{console.log("error")
    res.send({
        "response":400,
        "error":error["error"]["parent"]["detail"]})
        })
})


router.patch("/:id",(req,res)=>{
    // id change danger
        models.User.update(req.body,{
        where:{
        id:req.params.id
    }
    })
    .then((comment)=>{console.log("data is update")
    res.send({"response":200,"user":comment})
    })
    .catch(error=>{console.log("error")
    res.send({
        "response":400,
        "error":error["error"]["parent"]["detail"]})
        })
})


router.delete("/:id",(req,res)=>{
    // id change danger
        models.User.destroy({
        where:{
        id:{ [Op.gt]: 30}
    }
    })
    .then((comment)=>{console.log("data is delete")
    res.send({"response":200,"user":comment})
    })
    .catch(error=>{console.log("error")
    res.send({
        "response":400,
        "error":error})
        })
})

module.exports = router