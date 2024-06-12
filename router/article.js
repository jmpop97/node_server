let express = require("express")
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Article = require('../modules/article')

const upload = multer({
    storage: multer.diskStorage({
      	filename(req, file, done) {
			done(null, Date.now()+file.originalname);
        },
		destination(req, file, done) {
		    done(null, path.join(__dirname, "../uploads"));
	    },
    }),
    limits: { fileSize:
        // 1
         5 * 1024 * 1024 
        } // 5메가로 용량 제한
});

const uploadArrayImage = upload.array('image')


router.post("",async (req,res)=>{
    uploadArrayImage(req, res,async (err)=>
        {if (err){
            return res.send(400)
        }    
        let data={
            creater:req.log_in_user?.userId,
            state:"Active",
            title:req.body.title,
            text:req.body.text,
            tags:req.body.tags,
            images:[],
            permissions:['User']}
            console.log(data)
        data.images=req.files?.map(x=>x.path)
        let article=await Article.createArticle(data);
        res.send(article)
        }
    )  
})

router.patch("",async (req,res)=>{
    uploadArrayImage(req, res,async (err)=>
        {if (err){
            return res.send(400)
        }    
        let data={
            creater:req?.log_in_user.id,
            state:"Active",
            articleId:req.body?.articleId,
            title:req.body?.title,
            text:req.body?.text,
            tags:req.body?.tags,
            images:[],
            permissions:['User']}
        data.images=req.files?.map(x=>x.path)
        let article=await Article.patchArticle(data);
        res.send(article)
        }
    )  
})
module.exports = router