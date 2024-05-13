let express = require("express")
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const upload = multer({
    storage: multer.diskStorage({
      	filename(req, file, done) {
			done(null, Date.now()+file.originalname);
        },
		destination(req, file, done) {
		    done(null, path.join(__dirname, "./uploads"));
	    },
    }),
    limits: { fileSize:
        // 1
         5 * 1024 * 1024 
        } // 5메가로 용량 제한
});

const uploadArrayImage = upload.array('image')
router.post('/upload',
    (req,res)=>{
        uploadArrayImage(req, res,(err)=>
            {res.send("error")}
        )
    }
);

module.exports = router