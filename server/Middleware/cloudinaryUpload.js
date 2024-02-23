const cloudinary = require("cloudinary").v2;
const multer = require('multer');
require("dotenv").config();

const fs = require("fs");

//Create uploads folder if not already present
//in uploads folder we will temporarily upload
//image before uploading to cloudinary
if(!fs.existsSync("./uploads")){
    fs.mkdirSync("./uploads");
}

cloudinary.config({
    cloud_name: 'djgweeuce',
    api_key: '434956685422673',
    api_secret: 'keYzQ_qn3IBGzGq964yGtsKXLbk'
});

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"./uploads");
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload = multer({storage:storage});

module.exports = {upload,cloudinary};